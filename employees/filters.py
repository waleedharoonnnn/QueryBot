import django_filters
from .models import Employee

class EmployeeFilter(django_filters.FilterSet):
    emp_name = django_filters.CharFilter(field_name='emp_name', lookup_expr='icontains')
    designation = django_filters.CharFilter(field_name='designation', lookup_expr='icontains')

class Meta:
    model = Employee
    fields = ['emp_name', 'designation']