from rest_framework.generics import *
from .models import *
from .serializers import TasksSer


class UserTasks(RetrieveAPIView):
    lookup_field = 'user_id'
    queryset = UsersTasks.objects.using('task_database').all()
    serializer_class = TasksSer

