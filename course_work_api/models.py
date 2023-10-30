# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Subtasks(models.Model):
    subtask_id = models.IntegerField(primary_key=True)
    task = models.ForeignKey('Tasks', models.DO_NOTHING, blank=True, null=True)
    sign_readiness = models.DecimalField(max_digits=3, decimal_places=0)
    subtask_name = models.CharField(max_length=30, blank=True, null=True)
    subtask_description = models.CharField(max_length=100, blank=True, null=True)
    subtask_completing_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'subtasks'


class Tasks(models.Model):
    task_id = models.IntegerField(primary_key=True)
    task_name = models.CharField(max_length=30, blank=True, null=True)
    task_description = models.CharField(max_length=100, blank=True, null=True)
    task_start_date = models.DateTimeField(blank=True, null=True)
    task_end_date = models.DateTimeField(blank=True, null=True)
    task_completing_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'tasks'


class UsersTasks(models.Model):
    users_tasks_id = models.IntegerField(primary_key=True)
    user_id = models.IntegerField(blank=True, null=True)
    task = models.ForeignKey(Tasks, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users_tasks'
