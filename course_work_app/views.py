from django.contrib.auth.forms import UserCreationForm
from django.core.checks import messages
from django.shortcuts import render, redirect
from django.views.generic import TemplateView, CreateView
from .models import *
from .forms import UserRegistrationForm
from django.http import HttpResponse, HttpResponseNotFound, Http404
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
class MainView(TemplateView):
    template_name = 'Main_page.html'

    def get(self, request):
        return render(request, self.template_name)


class RegisterUser(TemplateView):
    template_name = 'Register_user.html'

    def get(self, request):
        return render(request, self.template_name)


@csrf_exempt
def register(request):
    if request.method == 'POST':
        user_form = UserRegistrationForm(request.POST)
        if user_form.is_valid():
            # Create a new user object but avoid saving it yet
            new_user = user_form.save(commit=False)
            # Set the chosen password
            new_user.set_password(user_form.cleaned_data['password'])
            # Save the User object
            new_user.save()
            return render(request, '/register_done.html', {'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request, 'Register_user.html', {'user_form': user_form})
