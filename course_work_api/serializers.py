from rest_framework import serializers
from .models import *


class TasksSer(serializers.ModelSerializer):
    class Meta:
        model = UsersTasks
        fields = '__all__'
        depth = 1
