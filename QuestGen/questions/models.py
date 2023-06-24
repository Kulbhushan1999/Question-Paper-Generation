from django.db import models

# Create your models here.
from django.db import models

class Question(models.Model):
    BOARD_CHOICES = [
        ('CBSE', 'CBSE'),
        ('ICSE', 'ICSE'),
        ('Karnataka', 'Karnataka'),
        # add more boards here
    ]

    CLASS_CHOICES = [
        ('6', 'Class 6'),
        ('7', 'Class 7'),
        ('8', 'Class 8'),
        ('9', 'Class 9'),
        ('10', 'Class 10'),
        # add more classes here
    ]

    SUBJECT_CHOICES = [
        ('English', 'English'),
        ('Hindi', 'Hindi'),
        ('Maths', 'Maths'),
        ('Science', 'Science'),
        ('EVS', 'EVS'),
        # add more subjects here
    ]

    QUESTION_TYPE_CHOICES = [
        ('MCQ', 'MCQ'),
        ('True or False', 'True or False'),
        ('Fill in the blanks', 'Fill in the blanks'),
        ('Match the following', 'Match the following'),
        ('Very Short Answers', 'Very Short Answers'),
        ('Short Answers', 'Short Answers'),
        ('Long Answers', 'Long Answers'),
        ('Very Long Answers', 'Very Long Answers'),
    ]

    DIFFICULTY_LEVEL_CHOICES = [
        ('Easy', 'Easy'),
        ('Average', 'Average'),
        ('Difficult', 'Difficult'),
    ]

    OBJECTIVE_CHOICES = [
        ('Remembering', 'Remembering'),
        ('Comprehension', 'Comprehension'),
        ('Expression', 'Expression'),
        ('Appreciation', 'Appreciation'),
        ('Understanding', 'Understanding'),
        ('Application', 'Application'),
        ('Skill', 'Skill'),
    ]

    board = models.CharField(max_length=20, choices=BOARD_CHOICES)
    class_ref = models.CharField(max_length=20, choices=CLASS_CHOICES)
    subject = models.CharField(max_length=50, choices=SUBJECT_CHOICES)
    chapter = models.CharField(max_length=150)
    question_type = models.CharField(max_length=50, choices=QUESTION_TYPE_CHOICES)
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_LEVEL_CHOICES)
    objective = models.CharField(max_length=50, choices=OBJECTIVE_CHOICES)

    question_image = models.ImageField(upload_to='questions/', blank=True, null=True)
    answer_image = models.ImageField(upload_to='answers/', blank=True, null=True)

    question_text = models.TextField( blank=True, null=True)
    answer_text = models.TextField( blank=True, null=True)
    explanation_text = models.TextField(blank=True, null=True)  # This field is optional

    marks = models.PositiveSmallIntegerField()
    approximate_time = models.PositiveSmallIntegerField()  # time in minutes

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
