from django import forms
from .models import Question

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['board', 'class_ref', 'subject', 'question_type', 'difficulty_level', 'objective', 'question_image', 'answer_image', 'question_text', 'answer_text', 'explanation_text', 'marks', 'approximate_time','chapter']

class GeneratePaperForm(forms.Form):
    class_ref = forms.ChoiceField(choices=Question.CLASS_CHOICES)
    subject = forms.ChoiceField(choices=Question.SUBJECT_CHOICES)
    exam_name = forms.CharField(max_length=200)
    # chapters = forms.MultipleChoiceField(choices=Question.CHAPTER_CHOICES, required=False)
    question_type = forms.MultipleChoiceField(choices=Question.QUESTION_TYPE_CHOICES, required=False)
    marks = forms.IntegerField(required=False)
    objectives = forms.CharField(max_length=500, required=False)
    difficulty_level = forms.ChoiceField(choices=Question.DIFFICULTY_LEVEL_CHOICES, required=False)
    time = forms.IntegerField(required=False)
    instructions = forms.CharField(max_length=500, required=False)
    institute_name = forms.CharField(max_length=200, required=False)
    sections = forms.CharField(max_length=200, required=False)

class InitialForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['board', 'class_ref', 'subject','chapter']
