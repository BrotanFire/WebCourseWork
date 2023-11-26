from rest_framework.generics import *
from .models import *
from .serializers import TasksSer, SubTasksSer, UserTaskSer


class UserTasks(RetrieveAPIView):
    lookup_field = 'user_id'
    queryset = UsersTasks.objects.using('task_database').all()
    serializer_class = TasksSer


class UserSubTask(RetrieveAPIView):
    lookup_field = 'task'
    queryset = Subtasks.objects.all()
    serializer_class = SubTasksSer


class UserTask(RetrieveAPIView):
    queryset = Tasks.objects.all()
    serializer_class = UserTaskSer

