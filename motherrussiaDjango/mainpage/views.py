from django.shortcuts import render
from .models import GameMode
from django.shortcuts import render, redirect
from django.contrib import auth
from django.shortcuts import get_object_or_404
from django.http import HttpResponseRedirect
from django.urls import reverse
import datetime


def mainpage(request):
    game_modes = GameMode.objects.all()
    return render(
        request,
        'index.html',
        {"game_modes": game_modes}
    )


def create_new_map(request):
    url_from = request.META['HTTP_REFERER']
    if request.method == "POST":
        new_game_mode = GameMode(
            name=request.POST.get("name"),
            author=request.POST.get("author"),
            description=request.POST.get("description"),
            locations=request.POST.get("locations"),
            locations_count=request.POST.get("locations_count"),
            likes_count=0,
            rating=5,
        )
        new_game_mode.save()
        return redirect(url_from)


def start_game(request, game_mode_id):
    game_mode = GameMode.objects.get(id=game_mode_id)
    return render(request, 'game.html', {"game_mode": game_mode})


def start_game_explorer_mode(request):
    return render(request, 'explorer_mode.html')

def start_game_bridges(request):
    return render(request, 'bridges.html')
