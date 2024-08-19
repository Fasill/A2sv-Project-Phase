'use client'
import { useState, useEffect } from "react";
import Card from "./components/Card";
import { useGetProductsQuery } from './redux/service/dummyData';
import withAuth from './protectedRoute/ProtectedRoute'
import {signOut, useSession} from 'next-auth/react';
import axios from "axios";
import { useRouter } from "next/navigation";

interface DataItem {
  logoUrl: string;
  id: string;
  title: string;
  image: string;
  description: string;
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

const Home = () => {
  const [sortOption, setSortOption] = useState<string>('default');
  const [fetchedData, setFetchedData] = useState<DataItem[]>([]);
  const [markedJobs, setMarkedJobs] = useState<string[]>([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const { data: res, isLoading, error } = useGetProductsQuery({});

  const sortedData = [...fetchedData].sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  const logout = async () => {
    localStorage.removeItem('token');
    await signOut();
    window.location.href = '/login';
  };

  const { data: session, status } = useSession() as Session;

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return <p>Please log in to bookmark.</p>;
  }

  const accessToken = session?.user?.accessToken;
  const router = useRouter();
  if (!accessToken) {
    router.push('/login');
  }
  useEffect(() => {
    const fetch = async () => {
      const baseUrl: string = "https://akil-backend.onrender.com";
      const headers = accessToken ? { Authorization: `Bearer ${accessToken}` } : {};
  
      try {
        const response = await axios.get(`${baseUrl}/bookmarks`, { headers });
        setMarkedJobs(response.data.data.map((item: { eventID: string; }) => item.eventID));
      } catch (error) {
        console.error("Error while fetching bookmarks:", error);
      }
    };
    fetch();
  }, [accessToken, isBookmarked]);

  useEffect(() => {
    if (isBookmarked) {
      if (res && res.data) {
        const markeddetail = res.data.filter((item: { id: string }) => markedJobs.includes(item.id));
        setFetchedData(markeddetail)
      }
    } else if (res && res.data) {
      setFetchedData(res.data);
    }
  }, [res, isBookmarked, markedJobs]);
  useEffect(()=>{
    console.log("sortedDatasortedDatasortedData",sortedData)
  },[sortedData])
  return (
    <div className='grid gap-6 pt-16 px-4 md:px-16 lg:px-24 pb-[3rem]' >
      <div className='flex items-center justify-between'>
        <div className='flex flex-col mb-4 md:mb-0'>
          <h1 data-testid="Opportunities" className='font-extrabold text-2xl md:text-3xl text-gray-900'>Opportunities</h1>
          <p className='font-normal text-lg md:text-base text-gray-500'>Showing {sortedData.length} results</p>
        </div>
        <div className='flex items-center gap-4'>
          <button 
            className={`px-4 py-2 rounded ${isBookmarked ? 'bg-gray-200 text-gray-700' : 'bg-blue-500 text-white'} transition-all duration-300`}
            onClick={() => setIsBookmarked(false)}>
            All Feed
          </button>
          <button 
            data-testid="Saved Jobs"
            className={`px-4 py-2 rounded ${isBookmarked ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} transition-all duration-300`}
            onClick={() => setIsBookmarked(true)}>
            Saved
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className='flex items-center'>
            <label className='font-normal text-lg text-gray-500 mr-2'>Sort by:</label>
            <select value={sortOption} onChange={handleSortChange} className='p-2 rounded bg-white border border-gray-300'>
              <option value="default">Default</option>
              <option value="title">Title</option>
            </select>
          </div>
          <button
            data-testid="Logout"
            className="text-gray-500 hover:text-gray-700 transition-all duration-300 ease-in-out px-4 py-2 rounded bg-red-500 text-white"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </div>

      {isLoading && 
        <div role="status" className="flex items-center justify-center h-[60vh]">
          <svg aria-hidden="true" className="w-[4rem] h-[4rem] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"> 
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/> 
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/> 
          </svg> 
          <span className="sr-only">Loading...</span> 
        </div>
      }
      {error && <p>Error loading data</p>}

      <div className='grid gap-4 lg:gap-6'>
        {sortedData.map((data: DataItem, index: number) => (
          <Card key={index} data={data} setMarkedJobs={setMarkedJobs} markedJobs={markedJobs}  />
        ))}
      </div>
    </div>
  );
};

export default withAuth(Home);
