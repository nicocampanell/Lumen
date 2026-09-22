import { createBrowserRouter } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import CirclesPage from './components/CirclesPage';
import CircleDetailPage from './components/CircleDetailPage';
import ProfilePage from './components/ProfilePage';
import InsightPage from './components/InsightPage';
import HeartRatePageWrapper from './components/HeartRatePageWrapper';
import NotificationPage from './components/NotificationPage';
import OnboardingPage from './components/OnboardingPage';
import EventsPage from './components/EventsPage';
import SignalEventPage from './components/SignalEventPage';
import WeeklySummaryPage from './components/WeeklySummaryPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { path: 'onboarding', element: <OnboardingPage /> },
      { index: true, element: <HomePage /> },
      { path: 'events', element: <EventsPage /> },
      { path: 'events/:eventId', element: <SignalEventPage /> },
      { path: 'weekly', element: <WeeklySummaryPage /> },
      { path: 'circles', element: <CirclesPage /> },
      { path: 'circle', element: <CircleDetailPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'insight', element: <InsightPage /> },
      { path: 'heartrate', element: <HeartRatePageWrapper /> },
      { path: 'notifications', element: <NotificationPage /> },
    ],
  },
]);
