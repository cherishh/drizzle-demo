// app/providers.jsx
'use client';
import posthog from 'posthog-js';
import { useAuth, useUser } from '@clerk/nextjs';
import { PostHogProvider as PHProvider } from 'posthog-js/react';
import { useEffect } from 'react';
import SuspendedPostHogPageView from './ph-page-view';

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
      api_host: '/ingest',
      ui_host: 'https://us.posthog.com',
      person_profiles: 'identified_only',
    });
  }, []);

  return (
    <PHProvider client={posthog}>
      <PostHogAuthWrapper>
        <SuspendedPostHogPageView />
        {children}
      </PostHogAuthWrapper>
    </PHProvider>
  );
}

function PostHogAuthWrapper({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const user = useUser();

  useEffect(() => {
    if (user.user) {
      posthog.identify(user.user.id, {
        email: user.user.emailAddresses[0].emailAddress,
      });
    } else if (!auth.isSignedIn) {
      posthog.reset();
    }
  }, [auth, user.user]);

  return children;
}
