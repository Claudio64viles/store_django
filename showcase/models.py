from django.db import models

# Create your models here.


class Category(models.Model):
    name = models.CharField(max_length=200)
    parent_category_id = models.IntegerField(null=True)
    def __str__(self):
        return self.name + ' - ID : ' + str(self.pk)
    

class Feature(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    def __str__(self):
        return self.name + ' - Category : ' + self.category.name 

class Distributor(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Manufacturer(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name

class Brand(models.Model):
    name = models.CharField(max_length=200)
    def __str__(self):
        return self.name


class Product(models.Model):
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, null=True)
    description = models.CharField(max_length=3000)
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE, null=True)
    distributor = models.ForeignKey(Distributor, on_delete=models.CASCADE, null=True)
    release_date = models.DateField(null=True, blank=True)
    msrp = models.IntegerField(null=True, blank=True)
    price = models.IntegerField()
    units = models.IntegerField(default=0)
    def __str__(self):
        return self.name + ' - Category : ' + self.category.name

class FeatureValue(models.Model):
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    value = models.CharField(max_length=300, null=True)
    def __str__(self):
        return self.value + ' - Feature : ' + self.feature.name  + ' - Product : ' + self.product.name