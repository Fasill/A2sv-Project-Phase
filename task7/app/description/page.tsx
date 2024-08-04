'use client';
import React, { useEffect, useState } from 'react';
import { FaRegCheckCircle } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { GoDotFill } from "react-icons/go";
import icon1 from '../assets/icons/icon1.png';
import icon2 from '../assets/icons/icon2.png';
import icon3 from '../assets/icons/icon3.png';
import icon4 from '../assets/icons/icon4.png';
import icon5 from '../assets/icons/icon5.png';

import { StaticImageData } from 'next/image';
import CustomButton from '../components/CustomButton';

interface JobPosting {
  id: string;
  title: string;
  description: string;
  responsibilities: string;
  requirements: string;
  idealCandidate: string;
  categories: string[];
  opType: string;
  startDate: string;
  endDate: string;
  deadline: string;
  location: string[];
  requiredSkills: string[];
  whenAndWhere: string;
  orgID: string;
  datePosted: string;
  status: string;
  applicantsCount: number;
  viewsCount: number;
  orgName: string;
  logoUrl: string;
  isBookmarked: boolean;
  isRolling: boolean;
  questions: string | null;
  perksAndBenefits: string | null;
  createdAt: string;
  updatedAt: string;
  orgPrimaryPhone: string;
  orgEmail: string;
  orgWebsite: string;
  averageRating: number;
  totalReviews: number;
}

const Page: React.FC = () => {
  const [id, setId] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<JobPosting | null>(null);

  useEffect(() => {
    const queryId = new URLSearchParams(window.location.search).get('id');
    if (queryId) {
      const fetchData = async () => {
        try {
          const res = await fetch(`https://akil-backend.onrender.com/opportunities/${queryId}`);
          const data = await res.json();
          console.log("Response data:", data.data);
          setFilteredData(data.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, []);

  const icons: StaticImageData[] = [icon1, icon2, icon3, icon4, icon5];
  const titles = ["Posted On", "Deadline", "Location", "Start Date", "End Date"];
  const contents = filteredData ? [
    filteredData.datePosted,
    filteredData.deadline,
    filteredData.location.join(", "),
    filteredData.startDate,
    filteredData.endDate
  ] : [];

  const responsibilities = filteredData ? filteredData.responsibilities.split('\n') : [];

  return (
    <div className='pt-[5rem] p-[3rem]'>
      {filteredData ? (
        <div className='flex flex-col lg:flex-row gap-6'>
          <div className="grid gap-[2rem] lg:w-[75%]">
            <div className='grid gap-[0.5rem]'>
              <h2 className='text-[24px] font-[900] text-[#25324B]'>Description</h2>
              <p className="text-[16px] font-[400] text-[#25324B]">{filteredData.description}</p>
            </div>
            
            <div className='grid gap-[0.5rem]'>
              <h2 className='text-[24px] font-[900] text-[#25324B]'>Responsibilities</h2>
              <ul>{responsibilities.map((data, index) =>
                <li key={index} className='flex items-center gap-[0.5rem]'> <FaRegCheckCircle className='text-[#56CDAD]'/> <p className="text-[16px] font-[400] text-[#25324B]">{data}</p></li>)}</ul>
            </div>
            <div className='grid gap-[0.5rem]'>
              <h2 className='text-[24px] font-[900] text-[#25324B]'>Ideal Candidate</h2>
              <p className="text-[16px] font-[400] text-[#25324B]">{filteredData.idealCandidate}</p>
            </div>
            
            <div className='grid gap-[0.5rem]'>
              <h2 className='text-[24px] font-[900] text-[#25324B]'>When & Where</h2>
              <div className='flex items-center gap-[0.5rem]'>
                <CiLocationOn className='text-[#56CDAD]' size={20}/>
                <p className="text-[16px] font-[400] text-[#25324B]">{filteredData.whenAndWhere}</p>
              </div>
            </div>
          </div>
          <div className='grid gap-[3rem]'>
            <div className='grid items-center justify-start gap-5'>
              <h2 className='text-[24px] font-[900] text-[#25324B]'>About</h2>
              <ul className='grid gap-5'>
                {icons.map((icon, index) =>
                  <li key={index} className='flex items-center gap-4'>
                    <img src={icon.src} alt={titles[index]} className='w-[3rem]'/> 
                    <div>
                      <p className='font-[400] text-[16px] text-[#515B6F]'>{titles[index]}</p>
                      <p className='font-[600] text-[16px] text-[#515B6F]'>{contents[index]}</p>
                    </div>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <h2 className='text-[24px] font-[900] text-[#25324B]'>Categories</h2>
              <div className='flex items-center gap-[1rem]'>
                <CustomButton padding='px-2 py-2' data={filteredData.categories[0] || ''} bg='bg-[#56cdad17]' color='text-[#56CDAD]' border={false} />
                <CustomButton padding='px-2 py-2' data={filteredData.categories[1] || ''}  bg='bg-[#ebb4004f]' color='text-[#ebb400]' border={false} />
              </div>
            </div>
            <div>
              <h2 className='text-[24px] font-[900] text-[#25324B]'>Required Skills</h2>
              <div className='flex items-center gap-[1rem]'>
                {filteredData.requiredSkills.map((data, index) =>
                  <p className="text-[#4640DE]" key={index}>{data}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div role="status" className="flex items-center justify-center h-[60lvh]"> 
            <svg aria-hidden="true" className="w-[4rem] h-[4rem] text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg"> 
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/> 
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/> 
            </svg> 
            <span className="sr-only">Loading...</span> 
        </div>
      )}
    </div>
  );
}

export default Page;
