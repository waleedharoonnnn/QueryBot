from django.db import models

# Create your models here.
class Student(models.Model):
    student_id = models.CharField(max_length=10)   # Custom student ID like "STU123"
    name = models.CharField(max_length=100)        # Student's name
    branch = models.CharField(max_length=50)       # Branch/Department e.g. "CS", "EE"

    def __str__(self):
        return self.name   # So that when you print the object in admin/shell, it shows the student's name
