/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { googleLoginThunk } from '@/store/features/auth/authThunk';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface GoogleSignInButtonProps {
  buttonId: string;
}

export default function GoogleSignInButton({ buttonId }: GoogleSignInButtonProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    const handleCredentialResponse = async (response: any) => {
      try {
        const res = await dispatch(googleLoginThunk(response.credential)).unwrap();
        toast.success(`Welcome back, ${res.user.name}!`);
        router.push('/dashboard');
      } catch (error: any) {
        toast.error(error || 'Google login failed');
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
      if ((window as any).google) {
        (window as any).google.accounts.id.initialize({
          client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
        });
        (window as any).google.accounts.id.renderButton(
          document.getElementById(buttonId),
          { theme: 'outline', size: 'large', width: 382 }
        );
      }
    };

    script.onload = initializeGoogle;
    if ((window as any).google) {
      initializeGoogle();
    }
  }, [dispatch, router, buttonId]);

  return <div id={buttonId} className="w-full flex justify-center" />;
}
