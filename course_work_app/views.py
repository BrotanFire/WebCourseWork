from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.views import LoginView
from django.contrib.messages.views import SuccessMessageMixin
from django.core.checks import messages
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.views.generic import TemplateView, CreateView
from .models import *
from .forms import UserRegistrationForm, LoginForm
from django.http import HttpResponse, HttpResponseNotFound, Http404
from django.views.decorators.csrf import csrf_exempt


# Create your views here.
class StartPage(TemplateView):
    template_name = 'main_templates/StartPage.html'

    def get(self, request):
        return render(request, self.template_name)


def WorkPage(request):
    if request.user.is_anonymous:
        return redirect("/auth")
    return render(request, "main_templates/WorkPage.html", {'username' : request.user.username})


class RegisterUser(TemplateView):
    template_name = 'Register_user.html'

    def get(self, request):
        return render(request, self.template_name)


def sign_in(request):
    if request.method == 'GET':
        form = LoginForm()
        return render(request, 'Auth_user.html', {'form': form})

    elif request.method == 'POST':
        form = LoginForm(request.POST)

        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user:
                login(request, user)
                return redirect('work-page')

        # form is not valid or user is not authenticated
        return render(request, 'Auth_user.html', {'form': form})


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
            return render(request, 'Auth_user.html', {'new_user': new_user})
    else:
        user_form = UserRegistrationForm()
    return render(request, 'Register_user.html', {'user_form': user_form})


@csrf_exempt
def sign_out(request):
    logout(request)
    return redirect('home')
