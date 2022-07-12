# -*- coding: utf-8 -*-

from django.db import models

from cms.models.pluginmodel import CMSPlugin
#from . import ProductsCategory


#class ProductsCategoryPluginModel(CMSPlugin):
#    class Meta:
#        app_label = 'Products Category'
#
#    taints_cache = True
#
#    category = models.ForeignKey(ProductsCategory)


class RecentProductsPluginModel(CMSPlugin):
    class Meta:
        app_label = 'Products'

    taints_cache = True

    max_items = models.PositiveIntegerField('max.number',
        blank=False,
        default=5,
        help_text=u'Please provide the maximum number of items to display (0 means unlimited)',
    )


class ProductsArchivePluginModel(CMSPlugin):
    class Meta:
        app_label = 'Products Archive'

    taints_cache = True

    show_months = models.BooleanField('show months?',
        default=False,
        help_text=u'Check this option to break the archive down into years and months.',
    )
