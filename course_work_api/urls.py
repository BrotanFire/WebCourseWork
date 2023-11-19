from django.urls import path
from .views import *

urlpatterns = [
    path('usertasks/<int:user_id>', UserTasks.as_view()),
    path('task')
]
