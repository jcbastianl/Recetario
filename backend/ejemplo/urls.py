from django.urls import path
from .views import Class_Ejemplo, Class_EjemploParametros , Class_EjemploUpload

urlpatterns = [
    path('ejemplo', Class_Ejemplo.as_view()), #esto es para que se pueda acceder a la vista
    path('ejemplo/<int:id>', Class_EjemploParametros.as_view()),
    path('ejemplo-upload', Class_EjemploUpload.as_view()),
]