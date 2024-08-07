'use client'
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '@/app/redux/service/dummyData';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
interface FormValues {
  email: string;
  password: string;
}


const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const forms = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const { register, handleSubmit, reset } = forms;
  const { errors } = forms.formState;

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    console.log(data);
    try {
      const response = await login(data).unwrap();
      console.log('Login successful:', response.data.refreshToken);
      localStorage.setItem('token', response.data.refreshToken);
      router.push('/');
      reset();
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  return (
    <div className='h-[100lvh] w-[100lvw] flex items-center justify-center p-[2rem]'>
      <div className="flex flex-col items-center justify-center w-full max-w-md p-[2rem]">
        <h1 className={`text-[32px] font-[900] text-[#25324B] mb-4`}>Welcome Back,</h1>
       
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
          
          <button type="submit" className='bg-[#201e5e] text-white p-3 rounded-full mt-4 text-[16px] font-[700]' >Continue</button>
          <p className ={`font-[400] text-[16px] text-[#2024309a] `}>Don't have an account? <span className='font-[700] text-[#201e5e]' ><Link href="/signup">Sign Up</Link></span> </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
