from rest_framework import serializers
from .models import Student

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'name', 'student_id', 'branch'] # 'id' is automatically added by DRF for ModelSerializers
