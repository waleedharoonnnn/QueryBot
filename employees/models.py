from django.db import models

class Employee(models.Model):
    emp_id = models.CharField(max_length=10, unique=True)
    emp_name = models.CharField(max_length=100)
    designation = models.CharField(max_length=100)  # fixed spelling

    def __str__(self):
        return self.emp_name
