'use client'
import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useVerifyEmailMutation } from '@/app/redux/service/dummyData';
import { useRouter } from 'next/navigation';
interface FormValues {
  code1: string;
  code2: string;
  code3: string;
  code4: string;
}

interface SignUpProps {
  onNext: (data: number) => void;
  email: string;
}

const schema = yup.object().shape({
  code1: yup.string().required('Code is required').length(1, 'Must be 1 digit'),
  code2: yup.string().required('Code is required').length(1, 'Must be 1 digit'),
  code3: yup.string().required('Code is required').length(1, 'Must be 1 digit'),
  code4: yup.string().required('Code is required').length(1, 'Must be 1 digit'),
});

const SignUp: React.FC<SignUpProps> = ({ onNext, email }) => {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [verifyEmail, { isLoading, isSuccess, isError }] = useVerifyEmailMutation();

  const watchedValues = watch();

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsResendEnabled(true);
    }
  }, [timer]);

  useEffect(() => {
    const allFilled = Object.values(watchedValues).every(value => typeof value === 'string' && value.length === 1);
    setIsFormFilled(allFilled);
  }, [watchedValues]);
  const router = useRouter();
  const onSubmit = async (data: FormValues) => {
    const fullCode = `${data.code1}${data.code2}${data.code3}${data.code4}`;
    const payload = {
      email: email,
      OTP: fullCode
    };

    try {
      const response = await verifyEmail(payload).unwrap();
      console.log('Verification successful:', response);
      localStorage.setItem('token', response.data.refreshToken);
      router.push('/');
      onNext(1);
      reset();
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value;
    if (value.length === 1 && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
    setValue(e.target.name as keyof FormValues, value, { shouldValidate: true });
  };

  const handleResend = () => {
    setTimer(60);
    setIsResendEnabled(false);
  };

  return (
    <div className='h-[100lvh] w-[100lvw] flex items-center justify-center p-[2rem]'>
      <div className="flex flex-col items-center justify-center w-full max-w-[408px] gap-[3rem]">
        <h1 className='text-[32px] font-[900] text-[#25324B] mb-4'>Verify Email</h1>
        <p className='text-[17px] font-[400] text-[#7c8493]'>
          We've sent a verification code to the email address you provided. To complete the verification process, please enter the code here.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full flex flex-col gap-6'>
          <div className='flex justify-between '>
            {['code1', 'code2', 'code3', 'code4'].map((code, index) => (
              <input
                key={code}
                id={code}
                type="text"
                {...register(code as keyof FormValues)}
                className={`p-2 rounded text-center w-[76px] h-[50px] border-[2px] border-[#4640DE66] bg-[#4540de17] text-[2rem] ${errors[code as keyof FormValues] ? 'border-red-500 ' : ''}`}
                maxLength={1}
                ref={(el: HTMLInputElement | null) => {
                  inputRefs.current[index] = el;
                }}
                onChange={(e) => handleInputChange(e, index)}
                placeholder='0'
              />
            ))}
          </div>
          <div className='flex flex-col items-center justify-center gap-2'>
            <p className='text-[17px] font-[400] text-[#7c8493]'>
              You can request to {isResendEnabled && <button type="button" onClick={handleResend} className='text-[#141247] font-bold'>Resend Code</button>} in {timer} seconds
            </p>
          </div>
          <button type="submit" className={`bg-[#201e5e] text-white p-3 rounded-full mt-4 text-[16px] font-[700] ${!isFormFilled && "bg-[#201e5e52]"}`} disabled={!isFormFilled || isLoading}>
            {isLoading ? 'Verifying...' : 'Continue'}
          </button>
          {isError && <p className='text-red-500'>Verification failed. Please try again.</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
