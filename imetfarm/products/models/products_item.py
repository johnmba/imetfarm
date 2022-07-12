# -*- coding: utf-8 -*-

from collections import Counter

from datetime import date

from django.urls import reverse
from django.db import models
from django.utils import timezone

from filer.fields.image import FilerImageField

from cms.models.fields import PlaceholderField


class ProductManager(models.Manager):

    def get_months(self, category_slug=None, years_only=False, edit_mode=False):

        if edit_mode:
            qs = self
        else:
            qs = self.filter(
                published=True,
                produc_date__lte=timezone.now
            )

        if category_slug:
            qs = qs.filter(categories__slug=category_slug)

        dates = qs.values_list('product_date', flat=True)

        if years_only:
            dates = [x.year for x in dates]
        else:
            dates = [(x.year, x.month) for x in dates]
        date_counter = Counter(dates)
        dates = set(dates)
        dates = sorted(dates, reverse=True)

        if years_only:
            return [{
                'date': date(year=year, month=1, day=1),
                'count': date_counter[year]
            } for year in dates]
        else:
            return [{
                'date': date(year=year, month=month, day=1),
                'count': date_counter[year, month]
            } for year, month in dates]


class ProductsItem(models.Model):
    class Meta:
        app_label = 'products'
        ordering = ['-product_date', ]

    taints_cache = True

    headline = models.CharField(
        'headline',
        blank=False,
        default='',
        help_text=u'Please provide a unique headline for this produc item.',
        max_length=255,
    )

    slug = models.SlugField(
        'slug',
        blank=False,
        default='',
        help_text=u'Please ensure there is a unique “slug” for this produc '
                  u'item. Note, it is strongly recommended that this does '
                  u'not change after publishing this produc item.',
        max_length=255,
    )

    announcement = models.BooleanField(
        u'announcement?',
        default=False,
        help_text=u'Check this box to display this item in the '
                  u'Announcements box on the front page.',
    )

    announcement_title = models.CharField(
        'announcement title',
        blank=True,
        default='',
        help_text=u'Optional. Alternate title to be used in the '
                  u'Announcements Box on the front page.',
        max_length=255,
    )

    subtitle = models.CharField(
        'subtitle',
        blank=True,
        default='',
        help_text=u'Optional. Please provide a unique subtitle for this '
                  u'produc item.',
        max_length=255,
    )

    categories = models.ManyToManyField(
        'products.ProductsCategory',
        blank=False,
        help_text=u'Please select one or more categories for this produc item.',
        related_name='product_items',
    )

    published = models.BooleanField(
        'pubished',
        default=False,
        help_text=u'Check to allow this produc post to be publically visible',
    )

    product_date = models.DateTimeField(
        u'product date',
        blank=False,
        default=timezone.now,
        help_text=u'Please provide the date of this produc item. Note, setting '
                  u'this to a future date will prevent this produc item from '
                  u'appearing until that time.'
    )

    mod_date = models.DateTimeField(
        u'modification date',
        auto_now=True,
        editable=False,
    )

    def is_future_publication(self):
        '''
        Returns ``True`` if this produc item has a future produc_date, else
        ``False``.
        '''
        return bool(self.product_date > timezone.now())

    objects = ProductManager()

    #related_staff = models.ManyToManyField(
    #    'staff.StaffMember',
    #    blank=True,
    #    help_text=u'Optional. Please choose zero or more staff related to '
    #              u'this item. Selected staff will automatically get a '
    #              u'Clipping added that references this produc item.',
    #    null=True,
    #    related_name='product_items',
    #    verbose_name=u'related staff',
    #)

    key_image = models.ImageField('category name',
        blank=False,
        default='',
        help_text=u'Optional. Please supply an image, if one is desired. This '
                  u'will be resized automatically.',
    )

    key_image_tooltip = models.CharField(
        'key image tooltip',
        blank=True,
        default='',
        help_text=u'Optional. Provide a short description of the key image '
                  u'(if present) for its “tooltip”',
        max_length=255,
    )

    product_body = PlaceholderField('product_item_body')

    def get_absolute_url(self):
        return reverse('product:product_item_detail', kwargs={'slug': self.slug})

    #
    # Purpose of this save() override:
    # =========================================================================
    # While this is not *required* per-se, it is a nice convenience to already
    # have a Text plugin to work with, since this means all editing can be
    # performed in Content mode and there is no longer the requirement to flip
    # to Structure mode first, just to create the Text plugin in this
    # placeholder.
    #
    def save(self, *args, **kwargs):
        #
        # Do NOT move this import out of this method. Bad things will happen
        # otherwise.
        #
        from cms.api import add_plugin

        if not self.pk:
            super(ProductsItem, self).save(*args, **kwargs)
            add_plugin(
                self.product_body,
                'TextPlugin',
                'en',
                body="<p>produc body coming soon.</p>"
            )
        else:
            super(ProductsItem, self).save(*args, **kwargs)

    def __unicode__(self):
        return self.headline
