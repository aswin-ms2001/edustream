'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { loginThunk } from '@/store/features/auth/authThunk';
import { selectAuthLoading } from '@/store/features/auth/authSelectors';
import GoogleSignInButton from '@/components/auth/GoogleSignInButton';

import { getDashboardPathForRole } from '@/lib/auth/roleUtils';

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthLoading);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(loginSchema as any),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await dispatch(loginThunk(data)).unwrap();
      toast.success(`Welcome back, ${response.user.name}!`);
      router.push(getDashboardPathForRole(response.user.role));
    } catch (error) {
      const errorMsg = typeof error === 'string' ? error : 'Failed to log in. Please check your credentials.';
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
            Welcome back to EduStream
          </CardTitle>
          <CardDescription className="text-slate-500">
            Enter your email to sign in to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-700">Password</Label>
                <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                className="bg-slate-50/50 border-slate-200 focus:bg-white transition-colors"
                {...register('password')}
              />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-5 shadow-md transition-all hover:shadow-lg" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
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

          <GoogleSignInButton buttonId="google-signin-btn" />
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-100 pt-6 pb-6">
          <div className="text-sm text-slate-500">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-blue-600 font-semibold hover:text-blue-500 hover:underline transition-all">
              Sign up
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
