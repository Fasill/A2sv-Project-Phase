'use client';
import CustomButton from './CustomButton';
import { useRouter } from 'next/navigation';
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import notify from '@/utils/notify';

interface CardProps {
  data: {
    id: string;
    title: string;
    logoUrl: string;
    description: string;
  };
  setMarkedJobs: React.Dispatch<React.SetStateAction<string[]>>;
  markedJobs: string[];
}

interface UserSession {
  user: {
    name: string;
    email: string;
    accessToken: string;
    refreshToken: string;
  };
  expires: string;
}

interface Session {
  data: UserSession | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
}

const Card = ({ data, setMarkedJobs, markedJobs }: CardProps) => {
  const router = useRouter();
  const { data: session, status } = useSession() as Session;
  const [isSpinning, setIsSpinning] = useState(false);
  const [loading, setLoading] = useState(false);

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Please log in to bookmark.</p>;
  }

  const accessToken = session?.user?.accessToken;

  const fetch = async (data: { type: string; id: string }) => {
    const baseUrl: string = "https://akil-backend.onrender.com";
    const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};

    try {
      if (data.type === "createBookmark") {
        const response = await axios.post(`${baseUrl}/bookmarks/${data.id}`, {}, { headers });
        return response;
      } else {
        const response = await axios.delete(`${baseUrl}/bookmarks/${data.id}`, { headers });
        return response;
      }
    } catch (error) {
      console.error("Error while updating bookmark:", error);
    }
  };

  const toggleBookmark = async (id: string, event: React.MouseEvent) => {
    event.stopPropagation();  // Prevents parent onClick from being triggered
    setLoading(true);
    setIsSpinning(true);
    try {
      await fetch({ type: markedJobs.includes(id) ? "deleteBookmark" : "createBookmark", id });
      setMarkedJobs(prevMarkedJobs =>
        markedJobs.includes(id)
          ? prevMarkedJobs.filter((jobId) => jobId !== id)
          : [...prevMarkedJobs, id]
      );
      notify.success("Bookmark updated successfully");
    } catch (error) {
      notify.error("Error while updating bookmark");
      console.error("Error while toggling bookmark:", error);
    } finally {
      setIsSpinning(false);
      setLoading(false);
    }
  };

  return (
    <div
    data-testid={`${data.id === "65509e9353a7667de6ef5a60"&&"job-card"}`}
      className='flex flex-col lg:flex-row justify-between p-6 rounded-[2rem] border w-full lg:w-4/5 mx-auto gap-[2rem] hover:shadow-[0px_0px_0px_1px_rgba(0,0,0,0.06),0px_1px_1px_-0.5px_rgba(0,0,0,0.06),0px_3px_3px_-1.5px_rgba(0,0,0,0.06),_0px_6px_6px_-3px_rgba(0,0,0,0.06),0px_12px_12px_-6px_rgba(0,0,0,0.06),0px_24px_24px_-12px_rgba(0,0,0,0.06)] cursor-pointer'
      onClick={() => {
        router.push(`/description?id=${data.id}`);
      }}
    >
      <div className='w-[7%]'>
        <img src={data.logoUrl || ''} alt={data.title} className='w-full h-auto object-cover rounded' />
      </div>
      <div className='flex w-[90%] flex-col items-start justify-center gap-3'>
        <div className='flex items-center justify-between w-[100%]'>
          <div>
            <h1 data-testid="job-title" className="text-lg md:text-xl font-semibold">{data.title}</h1>
            <p className='font-normal text-base text-gray-500'>Young Men Christians Association . Addis Ababa, Ethiopia</p>
          </div>
          {markedJobs.includes(data.id) ? (
            <FaBookmark
            data-testid={`${data.id === "65509e9353a7667de6ef5a60"&&"Delete bookmark"}`}
              size={20}
              color='#ebb400'
              aria-label="Remove bookmark"
              className={`cursor-pointer ${isSpinning && !loading ? 'animate-spin' : ''}`}
              onClick={(event) => toggleBookmark(data.id, event)}  // Pass the event here
            />
          ) : (
            
            <FaRegBookmark
            data-testid={`${data.id === "65509e9353a7667de6ef5a60"&&"Add bookmark"}`}

              size={20}
              color='#ebb400'
              aria-label="Add bookmark"
              className={`cursor-pointer ${isSpinning && !loading ? 'animate-spin' : ''}`}
              onClick={(event) => toggleBookmark(data.id, event)}  // Pass the event here
            />
          )}
        </div>
        <p className='text-base'>{data.description}</p>
        <div className='flex gap-2 mt-2'>
          <CustomButton padding='px-2 py-2' data='In Person' bg='bg-[#56cdad17]' color='text-[#56CDAD]' border={false} />
          <CustomButton padding='px-2 py-2' data='Education' bg='bg-[#ffff]' color='text-[#ebb400]' border={{ thickness: 'border-2', color: 'border-[#ebb400]' }} />
          <CustomButton padding='px-4 py-2' data='It' bg='bg-[#ffff]' color='text-[#4640de]' border={{ thickness: 'border-2', color: 'border-[#4640de]' }} />
        </div>
      </div>
    </div>
  );
};

export default Card;
