# -*- coding: utf-8 -*-

from cms.plugin_base import CMSPluginBase
from cms.plugin_pool import plugin_pool
from django.utils.translation import ugettext_lazy as _
from django.urls import reverse

from .models import ContactPluginModel
from .forms import ContactAjaxForm


class ContactPlugin(CMSPluginBase):
    model = ContactPluginModel
    name = _("Contact Form")
    render_template = "contacts/_contact_widget.html"


    def render(self, context, instance, placeholder):

        #
        # NOTE: We're actually interested in the request.path here, NOT the
        # referer, since this form will appear alongside real content, unlike
        # the contact form page, which is standalone.
        #
        try:
            path = context['request'].path
        except:
            path = ''

        form = ContactAjaxForm(initial={'referer': path})
        context.update({
            "title": instance.title,
            "form": form,
            "form_action": reverse('contacts:multi_form')
        })
        context = super().render(context, instance, placeholder)
        return context

plugin_pool.register_plugin(ContactPlugin)
