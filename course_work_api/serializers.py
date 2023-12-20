from rest_framework import serializers
from rest_framework.serializers import Serializer

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


class UserSer(Serializer):
    id = serializers.IntegerField()
    username = serializers.CharField(max_length=256)

    class Meta:
        read_only = 'true'


class UsersTasksSer(serializers.ModelSerializer):
    class Meta:
        model = UsersTasks
        fields = '__all__'
