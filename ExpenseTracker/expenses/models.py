from django.db import models
from django.contrib.auth.models import User

class Expense(models.Model):

    CATEGORY_CHOICES = [
        ("Food", "Food"),
        ("Transport", "Transport"),
        ("Shopping", "Shopping"),
        ("Bills", "Bills"),
        ("Entertainment", "Entertainment"),
        ("Other", "Other"),
    ]

    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=30, choices=CATEGORY_CHOICES)
    description = models.CharField(max_length=200)
    date = models.DateField()

    def __str__(self):
        return f"{self.category} - ₹{self.amount}"