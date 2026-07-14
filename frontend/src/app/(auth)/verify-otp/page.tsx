/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { otpSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MailCheck } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { verifyOtpThunk, resendOtpThunk } from '@/store/features/auth/authThunk';
import { selectAuthLoading } from '@/store/features/auth/authSelectors';

type OTPFormValues = z.infer<typeof otpSchema>;

function OTPForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email');
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema as any),
  });

  const onSubmit = async (data: OTPFormValues) => {
    if (!email) {
      toast.error('Email missing. Please sign up again.');
      return;
    }

    try {
      await dispatch(verifyOtpThunk({ email, otp: data.otp })).unwrap();
      
      toast.success('Email verified successfully!');
      router.push('/login');
    } catch (error: any) {
      toast.error(error || 'Invalid OTP. Please try again.');
    }
  };

  const handleResend = async () => {
    if (!email) {
      toast.error('Email missing.');
      return;
    }
    try {
      await dispatch(resendOtpThunk(email)).unwrap();
      toast.success('A new OTP has been sent to your email.');
    } catch (error: any) {
      toast.error(error || 'Failed to resend OTP.');
    }
  };

  return (
    <Card className="w-full max-w-md shadow-xl border-slate-200">
      <CardHeader className="space-y-2 text-center pb-6">
        <div className="flex justify-center mb-2">
          <div className="h-12 w-12 bg-emerald-500 rounded-full flex items-center justify-center shadow-inner">
            <MailCheck className="h-6 w-6 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
          Verify your email
        </CardTitle>
        <CardDescription className="text-slate-500">
          We&apos;ve sent a 6-digit verification code to <br />
          <span className="font-semibold text-slate-800">{email || 'your email'}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2 flex flex-col items-center">
            <Label htmlFor="otp" className="sr-only">One-Time Password</Label>
            <Input
              id="otp"
              placeholder="Enter 6-digit code"
              className="text-center text-lg tracking-[0.25em] h-14 bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
              maxLength={6}
              {...register('otp')}
            />
            {errors.otp && <p className="text-sm text-red-500 self-start">{errors.otp.message}</p>}
          </div>
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 shadow-md transition-all hover:shadow-lg" type="submit" disabled={isLoading}>
            {isLoading ? 'Verifying...' : 'Verify Email'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center border-t border-slate-100 pt-6 pb-6">
        <div className="text-sm text-slate-500">
          Didn&apos;t receive the code?{' '}
          <button onClick={handleResend} className="text-blue-600 font-semibold hover:text-blue-500 hover:underline transition-all bg-transparent border-none cursor-pointer">
            Resend it
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default function VerifyOTPPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Suspense fallback={<div className="animate-pulse flex flex-col items-center"><div className="w-12 h-12 bg-slate-200 rounded-full mb-4"></div><div className="h-8 w-48 bg-slate-200 rounded"></div></div>}>
        <OTPForm />
      </Suspense>
    </div>
  );
}
