
"""class AliasPlugin(CMSPluginBase):
    name = _("Alias")
    allow_children = False
    model = AliasPluginModel
    render_template = "cms/plugins/alias.html"

    def render(self, context, instance, placeholder):
        context = super().render(context, instance, placeholder)
        if instance.plugin_id:
            plugins = instance.plugin.get_descendants(
                include_self=True
            ).order_by('placeholder', 'tree_id', 'level', 'position')
            plugins = downcast_plugins(plugins)
            plugins[0].parent_id = None
            plugins = build_plugin_tree(plugins)
            context['plugins'] = plugins
        if instance.alias_placeholder_id:
            content = render_placeholder(instance.alias_placeholder, context)
            print content
            context['content'] = mark_safe(content)
        return context

    def get_extra_global_plugin_menu_items(self, request, plugin):
        return [
            PluginMenuItem(
                _("Create Alias"),
                reverse("admin:cms_create_alias"),
                data={
                    'plugin_id': plugin.pk,
                    'csrfmiddlewaretoken': get_token(request)
                },
            )
        ]

    def get_extra_placeholder_menu_items(self, request, placeholder):
        return [
            PluginMenuItem(
                _("Create Alias"),
                reverse("admin:cms_create_alias"),
                data={
                    'placeholder_id': placeholder.pk,
                    'csrfmiddlewaretoken': get_token(request)
                },
            )
        ]

    def get_plugin_urls(self):
        urlpatterns = [
            re_path(r'^create_alias/$', self.create_alias, name='cms_create_alias'),
        ]
        return urlpatterns

    def create_alias(self, request):
        if not request.user.is_staff:
            return HttpResponseForbidden("not enough privileges")
        if not 'plugin_id' in request.POST and not 'placeholder_id' in request.POST:
            return HttpResponseBadRequest(
                "plugin_id or placeholder_id POST parameter missing."
            )
        plugin = None
        placeholder = None
        if 'plugin_id' in request.POST:
            pk = request.POST['plugin_id']
            try:
                plugin = CMSPlugin.objects.get(pk=pk)
            except CMSPlugin.DoesNotExist:
                return HttpResponseBadRequest(
                    "plugin with id %s not found." % pk
                )
        if 'placeholder_id' in request.POST:
            pk = request.POST['placeholder_id']
            try:
                placeholder = Placeholder.objects.get(pk=pk)
            except Placeholder.DoesNotExist:
                return HttpResponseBadRequest(
                    "placeholder with id %s not found." % pk
                )
            if not placeholder.has_change_permission(request):
                return HttpResponseBadRequest(
                    "You do not have enough permission to alias this placeholder."
                )
        clipboard = request.toolbar.clipboard
        clipboard.cmsplugin_set.all().delete()
        language = request.LANGUAGE_CODE
        if plugin:
            language = plugin.language
        alias = AliasPluginModel(
            language=language, placeholder=clipboard,
            plugin_type="AliasPlugin"
        )
        if plugin:
            alias.plugin = plugin
        if placeholder:
            alias.alias_placeholder = placeholder
        alias.save()
        return HttpResponse("ok")"""