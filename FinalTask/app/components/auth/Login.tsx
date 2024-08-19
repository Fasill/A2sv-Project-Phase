'use client'
import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import notify from '@/utils/notify';

interface FormValues {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const [loading, setLoading] = useState(false);
  
  const forms = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const { register, handleSubmit, reset } = forms;
  const { errors } = forms.formState;

  const router = useRouter();
  
  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        notify.success('Login Successful');
        router.push('/');
        reset();
      } else {
        notify.error('Login Failed');
        console.error('Login Error:', result?.error);
      }
    } catch (err) {
      console.error('Unexpected Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='h-[100lvh] w-[100lvw] flex items-center justify-center p-[2rem]'>
      <div className="flex flex-col items-center justify-center w-full max-w-md p-[2rem]">
        <h1 data-testid="Welcome Back" className={`text-[32px] font-[900] text-[#25324B] mb-4`}>Welcome Back,</h1>
       
        <div className={`flex gap-[1rem] items-center justify-center w-full mb-4`}>
          <div className={`flex-grow h-[1px] bg-[#20243069]`}></div>
          <p className={`text-[#20243000] font-[400] text-[16px] `}>Or Login with</p>
          <div className={`flex-grow h-[1px] bg-[#20243069]`}></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
          <div className='grid gap-2'>
            <label htmlFor="email" className='text-[#515B6F] text-[16px] font-[600]'>Email</label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`border p-2 rounded ${errors.email ? 'border-red-500' : ''}`}
              placeholder='Enter Your Email'
            />
            {errors.email && <p className='text-red-500 text-[14px]'>{errors.email.message}</p>}
          </div>
          <div className='grid gap-2'>
            <label htmlFor="password" className='text-[#515B6F] text-[16px] font-[600]'>Password</label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`border p-2 rounded ${errors.password ? 'border-red-500' : ''}`}
              placeholder='Enter Your Password'
            />
            {errors.password && <p className='text-red-500 text-[14px]'>{errors.password.message}</p>}
          </div>
          
          <button type="submit" className='bg-[#201e5e] text-white p-3 rounded-full mt-4 text-[16px] font-[700] flex items-center justify-center' disabled={loading}>
            {loading ? (
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8v-8H4z"
                ></path>
              </svg>
            ) : (
              'Continue'
            )}
          </button>
          <p className={`font-[400] text-[16px] text-[#2024309a]`}>
            Don't have an account? <span className='font-[700] text-[#201e5e]'><Link href="/signup">Sign Up</Link></span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
