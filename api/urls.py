from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()   # use "router", not "route"
router.register('employees', views.EmployeeViewSet, basename='employee')

urlpatterns = [
    path('students/', views.studentsView),
    path('students/<int:pk>/', views.studentDetailView),
    path('', include(router.urls)),  # Include router URLs

    path('blogs/', views.BlogsView.as_view(), name='blog-list-create'),
    path('comments/', views.CommentsView.as_view(), name='comment-list-create'),
    path('blogs/<int:pk>/', views.BlogDetailView.as_view(), name='blog-detail'),
    path('comments/<int:pk>/', views.CommentDetailView.as_view(), name='comment-detail'),

]
