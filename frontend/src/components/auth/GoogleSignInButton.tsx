'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { googleLoginThunk } from '@/store/features/auth/authThunk';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface GoogleSignInButtonProps {
  buttonId: string;
}

interface GoogleCredentialResponse {
  credential: string;
  select_by?: string;
}

interface GoogleGsiAccountsId {
  initialize: (config: { client_id: string | undefined; callback: (res: GoogleCredentialResponse) => void }) => void;
  renderButton: (element: HTMLElement | null, options: { theme?: string; size?: string; width?: number }) => void;
}

interface GoogleGsi {
  accounts: {
    id: GoogleGsiAccountsId;
  };
}

export default function GoogleSignInButton({ buttonId }: GoogleSignInButtonProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleCredentialResponse = async (response: GoogleCredentialResponse) => {
      try {
        const res = await dispatch(googleLoginThunk(response.credential)).unwrap();
        toast.success(`Welcome back, ${res.user.name}!`);
        router.push('/student/dashboard');
      } catch (error) {
        const errorMsg = typeof error === 'string' ? error : 'Google login failed';
        toast.error(errorMsg);
      }
    };

    let script = document.getElementById('google-gsi-script') as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = 'google-gsi-script';
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }

    const initializeGoogle = () => {
      const google = (window as unknown as { google?: GoogleGsi }).google;
      if (google) {
        google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(
          document.getElementById(buttonId),
          { theme: 'outline', size: 'large', width: 382 }
        );
      }
    };

    script.onload = initializeGoogle;
    const google = (window as unknown as { google?: GoogleGsi }).google;
    if (google) {
      initializeGoogle();
    }
  }, [dispatch, router, buttonId]);

  return <div id={buttonId} className="w-full flex justify-center" />;
}
