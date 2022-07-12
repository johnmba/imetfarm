
from cms.admin.placeholderadmin import FrontendEditableAdminMixin
from django.contrib import admin
from adminsortable.admin import SortableAdmin
#FrontendEditableAdminMixin, admin.ModelAdmin
from .models import ProductsCategory



class ProductsCategoryAdmin(FrontendEditableAdminMixin, admin.ModelAdmin):

    list_display = ('name', )
    order_by = ('order', )
    prepopulated_fields = {"slug": ("name", )}
    frontend_editable_fields = ("name", "avatar", "descn")

    fieldsets = (
        (None, {
            'fields': (
                'name',
                'slug',
                "avatar", 
                "descn"
            ),
        }),
    )

admin.site.register(ProductsCategory, ProductsCategoryAdmin)




    #def save(self, commit=True):
    #    # Save some additional data.
    #    form_instance = super(CardAdminForm, self).save(commit=False)
#
    #    cleaned_data = self.cleaned_data
    #    form_instance.pan = '%s%s%s'\
    #    % (
    #        cleaned_data['acc'].iso.number,
    #        cleaned_data['acc'].number,
    #        cleaned_data['no']
    #    )
#
    #    if commit:
    #        form_instance.save()
    #    return form_instance