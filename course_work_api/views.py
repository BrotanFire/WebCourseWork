from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework import status
from rest_framework.generics import *
from rest_framework.response import Response

from .models import *
from .serializers import TasksSer, SubTasksSer, UserTaskSer, UsersTasksSer


class UserTasks(LoginRequiredMixin, RetrieveAPIView):
    lookup_field = 'user_id'
    queryset = UsersTasks.objects.using('task_database').all()
    serializer_class = TasksSer


class UserSubTask(LoginRequiredMixin, RetrieveAPIView):
    lookup_field = 'task'
    queryset = Subtasks.objects.all()
    serializer_class = SubTasksSer


class UserTask(LoginRequiredMixin, RetrieveAPIView):
    queryset = Tasks.objects.all()
    serializer_class = UserTaskSer


class CreateUsersTasks(LoginRequiredMixin, ListCreateAPIView):
    queryset = UsersTasks.objects.all()
    serializer_class = UsersTasksSer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CreateTask(LoginRequiredMixin, CreateAPIView):
    queryset = Tasks.objects.all()
    serializer_class = UserTaskSer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class CreateSubTasks(LoginRequiredMixin, ListCreateAPIView):
    queryset = Subtasks.objects.all()
    serializer_class = SubTasksSer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
