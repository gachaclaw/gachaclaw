# Generated manually for appearance settings

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0011_post_email_confirmations_enabled_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='theme',
            field=models.CharField(default='light', max_length=10),
        ),
        migrations.AddField(
            model_name='post',
            name='language',
            field=models.CharField(default='en', max_length=5),
        ),
        migrations.AddField(
            model_name='post',
            name='timezone',
            field=models.CharField(default='CST', max_length=10),
        ),
        migrations.AddField(
            model_name='post',
            name='time_format',
            field=models.CharField(default='military', max_length=10),
        ),
        migrations.AddField(
            model_name='post',
            name='show_animations',
            field=models.BooleanField(default=True),
        ),
    ]
