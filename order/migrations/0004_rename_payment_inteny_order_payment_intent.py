# Generated by Django 4.2.4 on 2023-10-05 07:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0003_order_payment_inteny'),
    ]

    operations = [
        migrations.RenameField(
            model_name='order',
            old_name='payment_inteny',
            new_name='payment_intent',
        ),
    ]
