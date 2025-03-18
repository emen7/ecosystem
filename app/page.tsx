'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Redirect the home page to Paper 1
export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to Paper 1 when component mounts
    router.push('/paper/1');
  }, [router]);

  // Return a minimal loading state while redirecting
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Loading UB Reader...</h1>
        <div className="w-12 h-12 border-4 border-blue-500 rounded-full border-t-transparent animate-spin mx-auto"></div>
      </div>
    </div>
  );
}
