import uuid
from django.db import models

# Create your models here.
class Post(models.Model):
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=30)
    password = models.CharField(max_length=30)
    email = models.CharField(max_length=30)
    money = models.DecimalField(decimal_places=2, max_digits=20)
    phone = models.CharField(max_length=10, null=True)
    country = models.CharField(max_length=63, default="america")
    
    def __str__(self) -> str:
        return f"Post: {self.username}"
    
    def save(self, *args, **kwargs):
        if not self.username:
            self.username = str(uuid.uuid4()).replace("-", "").upper()[:12]
        super().save(*args, **kwargs)
        
class Token(models.Model):
    id = models.AutoField(primary_key=True)
    token = models.CharField(max_length=255)
    created_at = models.DateTimeField()
    expires_at = models.DateTimeField()
    user_id = models.IntegerField()
    is_used = models.BooleanField(default=False)