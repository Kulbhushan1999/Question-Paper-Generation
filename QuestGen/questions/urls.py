from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('question/<int:question_id>/', views.question_detail, name='question_detail'),
    path('delete_question/<int:question_id>/', views.delete_question, name='delete_question'),
    path('question/<int:pk>/update/', views.QuestionUpdateView.as_view(), name='question_update'),
    path('new/', views.new_question, name='new_question'),
    path('generate/', views.create_question_paper, name='generate_paper'),
    path('select-questions/', views.select_question_group, name='select_question_group'),

]
