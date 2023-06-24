from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.views.generic.edit import UpdateView
from .models import Question
from .forms import QuestionForm, GeneratePaperForm, InitialForm
import json
from django.db.models import Min, Max
from django.core.serializers import serialize
def home(request):
    questions = Question.objects.all()
    return render(request, 'home.html', {'questions': questions})

def question_detail(request, question_id):
    question = Question.objects.get(id=question_id)
    return render(request, 'question_details.html', {'question': question})

def delete_question(request, question_id):
    if request.method == 'DELETE':
        question = get_object_or_404(Question, id=question_id)
        question.delete()
        return JsonResponse({'message': 'Question deleted.'})

class QuestionUpdateView(UpdateView):
    model = Question
    fields = ['board', 'class_ref', 'subject', 'question_type', 'difficulty_level', 'objective', 'marks', 'approximate_time', 'question_text', 'answer_text', 'question_image', 'answer_image','chapter']
    template_name_suffix = '_update_form'

    def get_success_url(self):
        return reverse_lazy('question_detail', args=[self.object.id])

def new_question(request):
    if request.method == 'POST':
        form = QuestionForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            return redirect('home')
    else:
        form = QuestionForm()
    return render(request, 'new_question.html', {'form': form})

def create_question_paper(request):
    if request.method == 'POST':
        form = InitialForm(request.POST)
        if form.is_valid():
            # Save form data to session
            request.session['board'] = form.cleaned_data['board']
            request.session['class_ref'] = form.cleaned_data['class_ref']
            request.session['subject'] = form.cleaned_data['subject']
            request.session['chapter'] = form.cleaned_data['chapter']
            return redirect('select_question_group')
    else:
        form = InitialForm()

    return render(request, 'generate_paper.html', {'form': form})

def select_question_group(request):
    board = request.session.get('board')
    class_ref = request.session.get('class_ref')
    subject = request.session.get('subject')
    chapters = request.session.get('chapter')
    
    questions = Question.objects.filter(board=board).values()
    
    question_list = [ {k: v for k, v in question.items() if k not in ['created_at', 'updated_at']} for question in questions ]

    difficulties = Question.objects.values_list('difficulty_level', flat=True).distinct()
    objectives = Question.objects.values_list('objective', flat=True).distinct()
    question_type = Question.objects.values_list('question_type', flat=True).distinct()
    # Get minimum and maximum values for time and marks
    min_time, max_time = Question.objects.aggregate(Min('approximate_time'), Max('approximate_time')).values()
    min_marks, max_marks = Question.objects.aggregate(Min('marks'), Max('marks')).values()

    # Convert to JSON
    questions_json = json.dumps(question_list)

    context = {
        'questions': questions_json,
        'difficulties': list(difficulties),
        'objectives': list(objectives),
        'question_type': list(question_type),
        'time_range': list(range(min_time, max_time + 1)),
        'marks_range': list(range(min_marks, max_marks + 1)),

    }

    return render(request, 'select_question_group.html', context)
