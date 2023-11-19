from rest_framework.generics import *
from .models import *
class View(ListAPIView):
    queryset = UsersTasks.objects.all()


