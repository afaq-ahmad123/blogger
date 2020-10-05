from django.contrib import admin
from .models import Blogs

# Register your models here.


@admin.register(Blogs)
class BlogAdmin(admin.ModelAdmin):
    list_display = ['id', 'header']
    fieldsets = (
        (None, {'fields': ('header', 'description', 'author', 'image')}),
    )
