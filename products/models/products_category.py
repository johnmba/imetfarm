# -*- coding: utf-8 -*-


from django.urls import reverse
from django.db import models
from django import forms

from adminsortable.models import Sortable


class ProductsCategory(models.Model):
    title = "Product and Services"
    class Meta:
        app_label = 'products'
        ordering = ['name']
        verbose_name_plural = 'product categories'

    taints_cache = True

    name = models.CharField('category name',
        blank=False,
        default='',
        help_text=u'Please provide a unique name for this product category.',
        max_length=64,
        unique=True,
    )

    slug = models.SlugField('slug',
        blank=False,
        default='',
        help_text=u'Please ensure there is a unique “slug” for this product category.',
        max_length=255,
        unique=True,
    )

    avatar = models.ImageField('avatar image',
        blank=False,
        default='',
        help_text=u'Please provide a unique name for this product category.',
    )

    descn = models.CharField('description',
        blank=False,
        default='',
        help_text=u'Please ensure there is a unique “slug” for this product category.',
        max_length=500,
    )

    def get_absolute_url(self):
        return reverse('products:archive', kwargs={'category_slug': self.slug})

    def __unicode__(self):
        return self.name


class ProductsCategoryForm(forms.ModelForm):
    """
    A Form for Cards (Admin console)
    """

    class Meta:
        model = ProductsCategory
        fields = (
            'name',
            'slug',
            "avatar", 
            "descn"
        )
