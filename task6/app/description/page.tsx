'use client';
import React, { useEffect, useState } from 'react';
import fetchedData from '../assets/fetchedData.json';
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
  id: number; 
  title: string;
  description: string;
  responsibilities:[string];
  ideal_candidate:
    {
      age:string,
      gender:string,
      traits:[string]
    },
  when_where:string;
  about:{
    categories:[string],
    deadline:string,
    end_date:string,
    location:string,
    posted_on:string,
    required_skills:[string],
    start_date:string
  }
}

const Page: React.FC = () => {
  const [id, setId] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState<JobPosting | null>(null);

  useEffect(() => {
    const queryId = new URLSearchParams(window.location.search).get('id');
    if (queryId) {
      setId(queryId);
      const job = fetchedData.job_postings.find(job => job.id.toString() === queryId);
      console.log(job);
      if (job) {
        setFilteredData(job);
      } else {
        console.error(`Job with ID ${queryId} not found`);
      }
    }
  }, []);
  const icons:StaticImageData[] = [icon1,icon2,icon3,icon4,icon5];
  const titles = ["Posted On", "Deadline", "Location", "Start Date", "End Date"]

  const contents = filteredData ? [
    filteredData.about.posted_on,
    filteredData.about.deadline,
    filteredData.about.location,
    filteredData.about.start_date,
    filteredData.about.end_date
  ] : [];
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
              <ul>{filteredData.responsibilities.map((data,index)=>
                <li key={index} className='flex items-center gap-[0.5rem]'> <FaRegCheckCircle className='text-[#56CDAD]'/> <p className="text-[16px] font-[400] text-[#25324B]">{data}</p></li>)}</ul>
            </div>
            <div className='grid gap-[0.5rem]'>
              <h2 className='text-[24px] font-[900] text-[#25324B]'>Ideal Candidate we want</h2>
              <ul>{filteredData.ideal_candidate.traits.map((data,index)=>
                  <li key={index} className={`text-[#25324B]  flex items-center gap-[0.5rem]`}><GoDotFill/> <p  className={`text-[16px]  ${index === 0?'font-[700]':"font-[400]"} text-[#25324B]`}>{data}</p></li>
              )}
              </ul>
            </div>
            
            <div className='grid gap-[0.5rem]'>
              <h2 className='text-[24px] font-[900] text-[#25324B]'>When & Where</h2>
              <div className='flex items-center gap-[0.5rem]'>
                <CiLocationOn className='text-[#56CDAD] ' size={20}/>
                <p className="text-[16px] font-[400] text-[#25324B]">{filteredData.when_where}</p>
              </div>
            </div>
          </div>
          <div className='grid gap-[3rem]'>
            <div className='grid items-center justify-start gap-5'>
              <h2 className='text-[24px] font-[900] text-[#25324B]'>About</h2>
              <ul className='grid gap-5'>
                {icons.map((icon,index)=>
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
              <h2 className='text-[24px] font-[900] text-[#25324B] '>Categories</h2>
              <div className='flex items-center gap-[1rem]'>
                <CustomButton padding='px-2 py-2' data={filteredData.about.categories[0] || ''} bg='bg-[#56cdad17]' color='text-[#56CDAD]' border={false} />
                <CustomButton padding='px-2 py-2' data={filteredData.about.categories[1] || ''}  bg='bg-[#ebb4004f]' color='text-[#ebb400]' border={false} />
              </div>

            </div>
            <div>
              <h2 className='text-[24px] font-[900] text-[#25324B] '>Required  Skills</h2>
              <div className='flex items-center gap-[1rem] '>


               {filteredData.about.required_skills.map((data, index) =>
                <p className="text-[#4640DE] " key={index}>{data}</p>
              )}
              </div>

            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Page;
