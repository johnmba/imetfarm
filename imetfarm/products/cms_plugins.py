# -*- coding: utf-8 -*-

from django.conf import settings
from django.db.models import Count
from django.utils import timezone

from cms.models.pluginmodel import CMSPlugin
from cms.plugin_pool import plugin_pool
from cms.plugin_base import CMSPluginBase

from .models import (
    ProductsCategory, ProductsItem,
    RecentProductsPluginModel,
    ProductsCategoryForm
)


class ProductCategoriesListPlugin(CMSPluginBase):
    model = CMSPlugin
    name = u'Products and services Categories List'
    render_template = "services.html"
    text_enabled = False
    cache = False

    def render(self, context, instance, placeholder):
        request = context.get('request', None)
        toolbar = getattr(request, 'toolbar', False)

        if toolbar and toolbar.edit_mode_active:
            context['addcategory'] = ProductsCategory
        categories = ProductsCategory.objects.order_by('-name')
        context['categories'] = categories
        context['instance'] = instance
        return context

plugin_pool.register_plugin(ProductCategoriesListPlugin)


class ProductsArchivePlugin(CMSPluginBase):
    #model = ProductsArchivePluginModel
    name = u'Products Archive'
    render_template = "Products/_Products_archive_plugin.html"
    text_enabled = False
    cache = False

    def render(self, context, instance, placeholder):
        request = context.get('request', None)
        toolbar = getattr(request, 'toolbar', False)

        category_slug = context.get('category_slug', None)
        context['show_months'] = instance.show_months
        context['dates'] = ProductsItem.objects.get_months(category_slug, years_only=(not instance.show_months), edit_mode=(toolbar and toolbar.edit_mode))
        context['instance'] = instance
        return context

#plugin_pool.register_plugin(ProductsArchivePlugin)


class RecentProductsPlugin(CMSPluginBase):
    model = RecentProductsPluginModel
    name = u'Recent Products'
    render_template = "Products/_recent_Products_plugin.html"
    text_enabled = False
    cache = False

    def render(self, context, instance, placeholder):
        request = context.get('request', None)
        toolbar = getattr(request, 'toolbar', False)

        if toolbar and toolbar.edit_mode_active:
            Products_items = ProductsItem.objects.order_by('-id')
        else:
            Products_items = ProductsItem.objects.filter(published=True, Products_date__lte=timezone.now).order_by('-Products_date')

        if instance.max_items:
            Products_items = Products_items[:instance.max_items]

        context['Products_items'] = Products_items
        context['instance'] = instance
        return context

#plugin_pool.register_plugin(RecentProductsPlugin)
