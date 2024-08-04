'use client';

import React, { useEffect } from 'react';
import { useGetProductQuery } from '../redux/service/dummyData';

const Page: React.FC = () => {
    const queryId = new URLSearchParams(window.location.search).get('id');

    if (!queryId) {
        return <p>Invalid Product ID.</p>;
    }

    const data= useGetProductQuery("657063e2144042c215319530");

    useEffect(() => {
        if (queryId) {
            console.log("Fetching data for queryId:", queryId,data);
        }
    }, [queryId]);

   
    return (
        <div>
          ss
        </div>
    );
};

export default Page;
