from django.urls import path
from .views import *

urlpatterns = [
    path('usertasks/<int:user_id>', UserTasks.as_view()),
    path('usersubtasks/<int:task>', UserSubTask.as_view()),
    path('usertask/<int:task>', UserTask.as_view()),
    path('createuserstasks/', CreateUsersTasks.as_view()),
    path('createtask/', CreateTask.as_view()),
    path('createuserstasks/', CreateUsersTasks.as_view()),
]
