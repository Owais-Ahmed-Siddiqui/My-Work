from rest_framework import serializers
from .models import Post, Comment, Profile
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = Profile
        fields = ['id', 'username', 'bio', 'location', 'profile_picture', 'following']

class CommentSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Comment
        fields = ['id', 'post', 'author', 'author_name', 'content', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    comments = CommentSerializer(many=True, read_only=True)
    likes_count = serializers.IntegerField(source='likes.count', read_only=True)

    class Meta:
        model = Post
        fields = ['id', 'author', 'author_name', 'content', 'image_url', 'created_at', 'likes_count', 'comments']
