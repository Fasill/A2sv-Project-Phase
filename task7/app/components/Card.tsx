'use client'
import CustomButton from './CustomButton';
import { useRouter } from 'next/navigation'

interface CardProps {
  data: {
    id:string;
    title: string;
    logoUrl: string;
    description: string;
  };
}

const Card = ({ data }: CardProps) => {
  const router = useRouter()

  return (
    <div 
    onClick={() => router.push(`/description?id=${data.id}`)}      className='flex flex-col lg:flex-row justify-between p-6 rounded-[2rem] border w-full lg:w-4/5 mx-auto gap-[2rem] hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] cursor-pointer'
    >
      <div className='w-[7%]'>
        <img src={data.logoUrl || ''} alt={data.title} className='w-full h-auto object-cover rounded' />
      </div>
      <div className='flex w-[90%] flex-col items-start justify-center gap-3'>
        <h1 className="text-lg md:text-xl font-semibold">{data.title}</h1>
        <p className='font-normal text-base text-gray-500'>Young Men Christians Association . Addis Ababa, Ethiopia</p>
        <p className='text-base'>{data.description}</p>
        <div className='flex gap-2 mt-2'>
          <CustomButton padding='px-2 py-2' data='In Person' bg='bg-[#56cdad17]' color='text-[#56CDAD]' border={false} />
          <CustomButton padding='px-2 py-2' data='Education' bg='bg-[#ffff]' color='text-[#ebb400]' border={{ thickness: 'border-2', color: 'border-[#ebb400]' }} />
          <CustomButton padding='px-4 py-2' data='It' bg='bg-[#ffff]' color='text-[#4640de]' border={{ thickness: 'border-2', color: 'border-[#4640de]' }} />
        </div>
      </div>
    </div>
  );
}

export default Card;
