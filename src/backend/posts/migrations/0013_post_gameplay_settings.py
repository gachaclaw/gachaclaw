# Generated manually for gameplay settings

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0012_post_appearance_settings'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='show_tips',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='post',
            name='confirm_spend',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='post',
            name='autoplay',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='post',
            name='game_resolution',
            field=models.CharField(default='1920x1080', max_length=15),
        ),
        migrations.AddField(
            model_name='post',
            name='game_theme',
            field=models.CharField(default='Classic', max_length=10),
        ),
        migrations.AddField(
            model_name='post',
            name='game_speed',
            field=models.CharField(default='Normal', max_length=10),
        ),
        migrations.AddField(
            model_name='post',
            name='music_volume',
            field=models.IntegerField(default=50),
        ),
        migrations.AddField(
            model_name='post',
            name='sfx_volume',
            field=models.IntegerField(default=50),
        ),
    ]
