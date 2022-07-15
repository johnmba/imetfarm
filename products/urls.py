# -*- coding: utf-8 -*-

from django.urls import re_path

from .views  import (
    NewsArchiveView,
    NewsItemDetailView,
)


app_name = "products"

urlpatterns = [

    #
    # News Archive List Views
    #
    #url(r'^$', NewsArchiveView.as_view(), name='archive'),
    #url(r'^(?P<year>\d{4})/$', NewsArchiveView.as_view(), name='archive'),
    #url(r'^(?P<year>\d{4})/(?P<month>\d{1,2})/$', NewsArchiveView.as_view(), name='archive'),
#
    #url(r'^category/(?P<category_slug>[^/]+)/(?P<year>\d{4})/$', NewsArchiveView.as_view(), name='archive'),
    #url(r'^category/(?P<category_slug>[^/]+)/(?P<year>\d{4})/(?P<month>\d{1,2})/$', NewsArchiveView.as_view(), name='archive'),

    #
    # News Item Detail
    #
    re_path(r'^(?P<slug>[^/]+)/$', NewsItemDetailView.as_view(), name='news_item_detail'),
    re_path(r'^category/(?P<category_slug>[^/]+)/$', NewsArchiveView.as_view(), name='archive'),
]
