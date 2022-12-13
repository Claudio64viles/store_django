from django.contrib import admin
from .models import Product, Feature, Category, FeatureValue, Brand, Manufacturer, Distributor

# Register your models here.

admin.site.register(Product)
admin.site.register(Feature)
admin.site.register(FeatureValue)
admin.site.register(Category)
admin.site.register(Brand)
admin.site.register(Manufacturer)
admin.site.register(Distributor)
