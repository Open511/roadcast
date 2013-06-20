from django.conf.urls import patterns, include, url

urlpatterns = patterns('open511_ui.views',
    url(r'^$', 'main', name='o5ui_home'),
    url(r'^events/(?P<event_slug>[^/]+/[^/]+)/?$', 'main'),
    url(r'^helpers/file_upload/$', 's3_file_upload_helper', name='o5ui_file_upload'),
)
