# Generated by Django 5.2 on 2025-04-10 13:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='user',
            options={'verbose_name': 'user', 'verbose_name_plural': 'users'},
        ),
        migrations.AlterUniqueTogether(
            name='user',
            unique_together=set(),
        ),
    ]
