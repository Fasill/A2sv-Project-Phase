'use client'

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.ComponentType) => {
  return (props: any) => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const token = localStorage.getItem('token');

    useEffect(() => {
      if (!token && status === 'unauthenticated') {
        router.push('/signup');
      }


    }, [status, router]);

    if (status === 'loading') {
      return <p>Loading...</p>;
    }

    if (status === 'authenticated'||token) {
      return <WrappedComponent {...props} />;
    }

    return null;
  };
};

export default withAuth;
