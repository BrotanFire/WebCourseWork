from rest_framework import serializers
from .models import *


class TasksSer(serializers.ModelSerializer):
    class Meta:
        model = UsersTasks
        fields = '__all__'
        depth = 1


class SubTasksSer(serializers.ModelSerializer):
    class Meta:
        model = Subtasks
        fields = '__all__'


class UserTaskSer(serializers.ModelSerializer):
    class Meta:
        model = Subtasks
        fields = '__all__'


class CreateUserTaskSer(serializers.ModelSerializer):
    class Meta:
        model = Tasks
        fields = (
        'task_id', 'task_name', 'task_description', 'task_start_date', 'task_end_date', 'task_completing_date')
