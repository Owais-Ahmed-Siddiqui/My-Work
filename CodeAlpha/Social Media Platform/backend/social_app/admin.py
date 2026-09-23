from django.contrib import admin
from .models import Post, Comment, Profile

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'location')

@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('author', 'created_at', 'likes_count')
    
    def likes_count(self, obj):
        return obj.likes.count()

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author', 'post', 'created_at')
