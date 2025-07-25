from django.db import models

# Create your models here.
class Post(models.Model):
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    money = models.DecimalField(decimal_places=2, max_digits=20)
    
    def __str__(self):
        return f"Post: {self.username}"