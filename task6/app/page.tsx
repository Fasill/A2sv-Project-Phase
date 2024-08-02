"use client"
import {useState} from "react"
import fetchedData from "./assets/fetchedData.json";
import Card from "./components/Card";

interface DataItem {
  title: string;
  image: string;
  description: string;
}
export default function Home() {
  const [sortOption, setSortOption] = useState<string>('default');

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  const sortedData = [...fetchedData.job_postings].sort((a, b) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <div className='grid gap-6 pt-16 px-4 md:px-16 lg:px-24 pb-[3rem]'>
    <div className='flex items-center justify-center'>
      <div className='flex flex-col md:flex-row justify-between items-center w-full lg:w-4/5'>
        <div className='flex flex-col mb-4 md:mb-0'>
          <h1 className='font-extrabold text-2xl md:text-3xl text-gray-900'>Opportunities</h1>
          <p className='font-normal text-lg md:text-base text-gray-500'>Showing {sortedData.length} results</p>
        </div>
        <div className='flex items-center'>
          <label className='font-normal text-lg text-gray-500 mr-2'>Sort by:</label>
          <select value={sortOption} onChange={handleSortChange} className='p-2 rounded bg-white'>
            <option value="default">Default</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>
    </div>
    <div className='grid gap-4 lg:gap-6'>
      {sortedData.map((data: DataItem, index: number) => (
        <Card key={index} data={data} />
      ))}
    </div>
  </div>
  );
}
