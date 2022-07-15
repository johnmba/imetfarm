# -*- coding: utf-8 -*-

from cms.app_base import CMSApp
from cms.apphook_pool import apphook_pool


class ContactFormApphook(CMSApp):
    name = u"contacts"
    urls = ["contacts.urls", ]

apphook_pool.register(ContactFormApphook)
