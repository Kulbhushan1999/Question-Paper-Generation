from django.core.management.base import BaseCommand
from django.utils.crypto import get_random_string
from django.core.files.base import ContentFile
from faker import Faker

from questions.models import Question

class Command(BaseCommand):
    help = 'Create random questions'

    def add_arguments(self, parser):
        parser.add_argument('total', type=int, help='Indicates the number of questions to be created')

    def handle(self, *args, **kwargs):
        total = kwargs['total']
        faker = Faker()

        for i in range(total):
            Question.objects.create(
                board=faker.random_element(elements=('CBSE')),
                class_ref=faker.random_element(elements=('6')),
                subject=faker.random_element(elements=('English')),
                question_type=faker.random_element(elements=('MCQ', 'True or False', 'Fill in the blanks', 'Match the following', 'Very Short Answers', 'Short Answers', 'Long Answers', 'Very Long Answers')),
                difficulty_level=faker.random_element(elements=('Easy', 'Average', 'Difficult')),
                objective=faker.random_element(elements=('Remembering', 'Comprehension', 'Expression', 'Appreciation', 'Understanding', 'Application', 'Skill')),
                question_text=faker.paragraph(),
                answer_text=faker.paragraph(),
                explanation_text=faker.paragraph(),
                marks=faker.random_int(min=1, max=5),
                approximate_time=faker.random_int(min=1, max=5),
                chapter = 'test'
                
            )
        self.stdout.write(self.style.SUCCESS(f'{total} questions were created successfully!'))
