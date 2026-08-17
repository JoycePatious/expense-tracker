from django.urls import path
from .views import (
    ExpenseListCreateView,
    ExpenseDeleteView,
    ExpenseUpdateView,
    MonthlyTotalView,
    RegisterView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),

    path("expenses/", ExpenseListCreateView.as_view(), name="expense-list"),
    path("expenses/<int:pk>/", ExpenseDeleteView.as_view(), name="expense-delete"),
    path("expenses/<int:pk>/update/", ExpenseUpdateView.as_view(), name="expense-update"),
    path("expenses/month-total/", MonthlyTotalView.as_view(), name="monthly-total"),
]