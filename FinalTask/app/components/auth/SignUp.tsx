'use client'
import React from 'react';
import { FcGoogle } from "react-icons/fc";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useSignUpMutation } from '@/app/redux/service/dummyData';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import notify from '@/utils/notify';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: string;
}

interface SignUpProps {
  onNext: (data: number) => void;
  PassedEmail: (email: string) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const SignUp: React.FC<SignUpProps> = ({ onNext, PassedEmail }) => {
  const forms = useForm<Omit<FormValues, 'role'>>({
    resolver: yupResolver(schema)
  });

  const { register, handleSubmit, reset } = forms;
  const { errors } = forms.formState;

  const [signUp, { isLoading, isError, error }] = useSignUpMutation();

  const onSubmit = async (data: Omit<FormValues, 'role'>) => {
    const fullData = { ...data, role: 'user' };
    try {
      const response = await signUp(fullData).unwrap();
      if (response.success) {
        notify.success('Sign up successful check your email for verification');
        console.log('Sign up successful:', response);
        PassedEmail(data.email);
        onNext(1);
        reset();
      } else {
        console.error('Sign up failed:', response.error);
      }
      // console.log('Sign up successful:', response);
      // PassedEmail(data.email);
      // onNext(1);
      // reset();
    } catch (err) {
      console.error('Failed to sign up:', err);
      notify.error('Sign up failed');
    }
  };

  return (
    <div className='h-[100lvh] w-[100lvw] flex items-center justify-center p-[2rem]'>
      <div className="flex flex-col items-center justify-center w-full max-w-md p-[2rem]">
        <h1 className={`text-[32px] font-[900] text-[#25324B] mb-4`}>Sign Up Today!</h1>
        <button
          className={`flex gap-[0.7rem] items-center justify-center border px-4 py-3 w-full rounded mb-4`}
          onClick={() => signIn('google')}
        >
          <FcGoogle />
          <p className={`font-[700] text-[16px] text-[#4640DE]`}>Sign Up with Google</p>
        </button>
        <div className={`flex gap-[1rem] items-center justify-center w-full mb-4`}>
          <div className={`flex-grow h-[1px] bg-[#202430a6]`}></div>
          <p className={`text-[#202430a6] font-[400] text-[16px]`}>Or Sign Up with Email</p>
          <div className={`flex-grow h-[1px] bg-[#202430a6]`}></div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-4'>
          <div className='grid gap-2'>
            <label htmlFor="name" className='text-[#515B6F] text-[16px] font-[600]'>Full Name</label>
            <input
              id="name"
              type="text"
              {...register('name')}
              className={`border p-2 rounded ${errors.name ? 'border-red-500' : ''}`}
              placeholder='Enter Your fullName'
            />
            {errors.name && <p className='text-red-500 text-[14px]'>{errors.name.message}</p>}
          </div>
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
          <div className='grid gap-2'>
            <label htmlFor="confirmPassword" className='text-[#515B6F] text-[16px] font-[600]'>Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className={`border p-2 rounded ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder='Confirm Your Password'
            />
            {errors.confirmPassword && <p className='text-red-500 text-[14px]'>{errors.confirmPassword.message}</p>}
          </div>
          <button type="submit" className='bg-[#201e5e] text-white p-3 rounded-full mt-4 text-[16px] font-[700]'>Continue</button>
          <p className={`font-[400] text-[16px] text-[#2024309a]`}>Already have an account? <span className='font-[700] text-[#201e5e]'><Link href="/login">Login</Link></span></p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
