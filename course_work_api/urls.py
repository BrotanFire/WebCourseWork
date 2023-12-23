from django.urls import path
from .views import *

urlpatterns = [
    path('usertasks/', UserTasks.as_view()),
    path('usersubtasks/<int:task_id>', UserSubTask.as_view()),
    path('usertask/<int:task_id>', UserTask.as_view()),
    path('createuserstasks/', CreateUsersTasks.as_view()),
    path('createtask/', CreateTask.as_view()),
    path('leavetask/<int:users_tasks_id>', LeaveTask.as_view()),
    path('users/', ShowUsers.as_view()),
    path('appoint-task/', AppointTask.as_view()),
    path('createsubtask/',CreateSubTasks.as_view())

]
