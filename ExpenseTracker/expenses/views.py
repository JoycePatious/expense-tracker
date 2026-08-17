from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Sum
from datetime import date

from .models import Expense
from .serializers import ExpenseSerializer, RegisterSerializer


class ExpenseListCreateView(generics.ListCreateAPIView):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(
            owner=self.request.user
        ).order_by("-date")

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class ExpenseDeleteView(generics.DestroyAPIView):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(owner=self.request.user)


class ExpenseUpdateView(generics.UpdateAPIView):
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return Expense.objects.filter(owner=self.request.user)


class MonthlyTotalView(APIView):

    def get(self, request):
        today = date.today()

        total = Expense.objects.filter(
            owner=request.user,
            date__year=today.year,
            date__month=today.month
        ).aggregate(Sum("amount"))

        return Response({
            "total": total["amount__sum"] or 0
        })


class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]