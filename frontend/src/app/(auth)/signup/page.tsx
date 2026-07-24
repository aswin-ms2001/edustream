'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signupSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { registerThunk } from '@/store/features/auth/authThunk';
import { selectAuthLoading } from '@/store/features/auth/authSelectors';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

type SignupFormValues = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(signupSchema as any),
  });

  const onSubmit = async (data: SignupFormValues) => {
    try {
      await dispatch(registerThunk(data)).unwrap();
      
      toast.success('Registration successful! Please check your email/console for OTP.');
      router.push(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (error) {
      const errorMsg = typeof error === 'string' ? error : 'Failed to create account. Please try again.';
      toast.error(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl border-slate-200">
        <CardHeader className="space-y-2 text-center pb-6">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-inner">
              <BookOpen className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-slate-900">
            Create an Account
          </CardTitle>
          <CardDescription className="text-slate-500">
            Join EduStream and start learning today
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-700">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
                {...register('name')}
              />
              {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
                {...register('email')}
              />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-700">Password</Label>
              <Input
                id="password"
                type="password"
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
                {...register('password')}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 shadow-md transition-all hover:shadow-lg mt-2" type="submit" disabled={isLoading}>
              {isLoading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-slate-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <GoogleSignInButton buttonId="google-signup-btn" />
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-100 pt-6 pb-6">
          <div className="text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-500 hover:underline transition-all">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
