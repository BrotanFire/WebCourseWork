from django.urls import path
from .views import *

urlpatterns = [
    path('/usertasks/<int:user_id>', ),
    path('/subtasks/<int:task_id>',),
    path('/task/<int:task_id>',)
]
