# -*- coding: utf-8 -*-

from django.urls import re_path

from .views import ContactFormView, ContactFormAjaxView


app_name = "contacts"
urlpatterns = [
    re_path(r'^multi_form/$', ContactFormAjaxView.as_view(), name='multi_form'),
    re_path(r'^$', ContactFormView.as_view(), name='contact_form'),
]
