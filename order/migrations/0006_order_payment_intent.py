# Generated by Django 4.2.4 on 2023-10-06 09:26

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('order', '0005_remove_order_payment_intent'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='payment_intent',
            field=models.CharField(default='', max_length=255),
            preserve_default=False,
        ),
    ]
