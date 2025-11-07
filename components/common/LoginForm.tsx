'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { loginSchema, type LoginFormData } from '@/lib/validations';
import { login } from '@/lib/store';
import { useState } from 'react';

export function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      if (data.email === 'admin@gmail.com' && data.password === 'admin@123') {
        dispatch(login({ name: 'Admin User', email: data.email }));
        router.push('/');
      } else {
        setError('root', {
          message: 'Invalid email or password. Use admin@gmail.com / admin@123',
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/3 left-10 w-6 h-6 bg-emerald-400/20 rounded-full blur-sm"
      />
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-1/4 right-16 w-8 h-8 bg-sky-400/15 rounded-full blur-sm"
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md mx-auto px-6"
      >
        <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl shadow-emerald-500/10 rounded-2xl text-white">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent">
              Welcome Back
            </CardTitle>
            <CardDescription className="text-slate-300 mt-2">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
              <div>
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <Input
                  id="email"
                  type="email"
                  {...register('email')}
                  placeholder="Enter your email"
                  className="mt-2 bg-white/90 text-slate-900 placeholder-slate-500 border border-slate-300/40 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 rounded-xl shadow-inner"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <Label htmlFor="password" className="text-slate-200">Password</Label>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                  placeholder="Enter your password"
                  className="mt-2 bg-white/90 text-slate-900 placeholder-slate-500 border border-slate-300/40 focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 rounded-xl shadow-inner"
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {errors.root && (
                <p className="text-red-400 text-center mt-2">{errors.root.message}</p>
              )}

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 mt-2 bg-emerald-500 hover:bg-emerald-600 text-white text-lg rounded-xl shadow-lg shadow-emerald-500/25 transition-all duration-300 hover:scale-[1.02]"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            {/* Demo credentials */}
            <div className="mt-6 text-center">
              <p className="text-slate-400 text-sm">Demo credentials:</p>
              <p className="text-emerald-400 font-medium mt-1">
                admin@gmail.com / admin@123
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
}
