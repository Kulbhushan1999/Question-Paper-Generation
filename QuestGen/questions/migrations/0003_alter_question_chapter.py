# Generated by Django 4.2.1 on 2023-05-18 08:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('questions', '0002_question_chapter'),
    ]

    operations = [
        migrations.AlterField(
            model_name='question',
            name='chapter',
            field=models.CharField(max_length=150),
        ),
    ]
