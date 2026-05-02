import { lazy } from 'react';

// Lazy load heavy components for better performance
export const LazyDashboard = lazy(() => import('@/pages/Dashboard'));
export const LazyCVBuilder = lazy(() => import('@/pages/CVBuilder'));
export const LazyCVList = lazy(() => import('@/pages/CVList'));
export const LazyInterviewLanding = lazy(() => import('@/pages/InterviewLanding'));
export const LazyInterviewSetup = lazy(() => import('@/pages/InterviewSetup'));
export const LazyInterviewSession = lazy(() => import('@/pages/InterviewSession'));
export const LazyInterviewResults = lazy(() => import('@/pages/InterviewResults'));
export const LazySettings = lazy(() => import('@/pages/Settings'));
export const LazyOnboarding = lazy(() => import('@/pages/Onboarding'));
export const LazyAdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
