# Generated by Django 4.1.3 on 2022-12-07 17:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('showcase', '0005_rename_stock_product_units'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='msrp',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
