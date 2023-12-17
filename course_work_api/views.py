from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.shortcuts import render
from rest_framework import status
from rest_framework.generics import *
from rest_framework.response import Response

from .models import *
from .serializers import TasksSer, SubTasksSer, UserTaskSer, UsersTasksSer


class UserTasks(LoginRequiredMixin, ListAPIView):
    serializer_class = TasksSer

    def get_queryset(self):
        queryset = UsersTasks.objects.using('task_database').all().filter(user_id=self.request.user.id)
        return queryset


class UserSubTask(LoginRequiredMixin, ListAPIView):
    serializer_class = SubTasksSer

    def get_queryset(self):
        queryset = Subtasks.objects.using('task_database').all().filter(task_id=self.kwargs.get('task_id'))
        return queryset


class UserTask(LoginRequiredMixin, RetrieveAPIView):
    queryset = Tasks.objects.all()
    serializer_class = UserTaskSer
    lookup_field = 'task_id'


class CreateUsersTasks(LoginRequiredMixin, ListCreateAPIView):
    queryset = UsersTasks.objects.all()
    serializer_class = UsersTasksSer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class LeaveTask(LoginRequiredMixin, DestroyAPIView):
    queryset = UsersTasks.objects.all()
    serializer_class = UsersTasksSer
    lookup_field = 'users_tasks_id'


class CreateTask(LoginRequiredMixin, CreateAPIView):
    queryset = Tasks.objects.all()
    serializer_class = UserTaskSer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return render(request, "main_templates/AddTask.html", {'username': request.user.username},status=status.HTTP_201_CREATED)


class CreateSubTasks(LoginRequiredMixin, ListCreateAPIView):
    queryset = Subtasks.objects.all()
    serializer_class = SubTasksSer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
