from django.shortcuts import render

# Create your views here.

def index(request, slug=None):
    return render(request, 'index.html')