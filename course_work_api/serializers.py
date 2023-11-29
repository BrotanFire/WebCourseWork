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
        model = Tasks
        fields = '__all__'


class UsersTasksSer(serializers.ModelSerializer):
    class Meta:
        model = UsersTasks
        fields = '__all__'
