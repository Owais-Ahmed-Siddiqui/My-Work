"""
Django settings for VogueStore project.
Uses MongoDB as the primary database via djongo.
"""
import os
from pathlib import Path
from datetime import timedelta

# ─── Build paths ───
BASE_DIR = Path(__file__).resolve().parent.parent

# ─── SECURITY ───
SECRET_KEY = os.environ.get(
    'DJANGO_SECRET_KEY',
    'django-insecure-voguestore-change-me-in-production-!@#$%'
)
DEBUG = os.environ.get('DJANGO_DEBUG', 'True').lower() == 'true'
ALLOWED_HOSTS = os.environ.get('DJANGO_ALLOWED_HOSTS', '*').split(',')

# ─── Application definition ───
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third party
    'rest_framework',
    'corsheaders',
    'django_filters',
    # Local apps
    'products',
    'users',
    'orders',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'voguestore.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'voguestore.wsgi.application'

# ─── DATABASE (MongoDB) ───
DATABASES = {
    'default': {
        'ENGINE': 'djongo.backend',
        'NAME': os.environ.get('MONGO_DB_NAME', 'voguestore'),
        'ENFORCE_SCHEMA': False,
        'CLIENT': {
            'host': os.environ.get('MONGO_HOST', 'localhost'),
            'port': int(os.environ.get('MONGO_PORT', 27017)),
            'username': os.environ.get('MONGO_USER', ''),
            'password': os.environ.get('MONGO_PASSWORD', ''),
            'authSource': os.environ.get('MONGO_AUTH_SOURCE', 'admin'),
            'connect': False,
        },
    }
}

# ─── Password validation ───
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

# ─── Custom User Model ───
AUTH_USER_MODEL = 'users.User'

# ─── Internationalization ───
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ─── Static files ───
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# ─── Media files ───
MEDIA_URL = 'media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ─── Default primary key field type ───
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ─── REST Framework ───
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticatedOrReadOnly',
    ],
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
        'rest_framework.filters.OrderingFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
    ],
}

# ─── JWT Settings ───
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(hours=1),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=7),
    'ROTATE_REFRESH_TOKENS': True,
}

# ─── CORS Settings ───
CORS_ALLOW_ALL_ORIGINS = DEBUG
CORS_ALLOWED_ORIGINS = os.environ.get(
    'CORS_ALLOWED_ORIGINS',
    'http://localhost:5173,http://localhost:3000,http://127.0.0.1:5173'
).split(',')

CORS_ALLOW_CREDENTIALS = True
