import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const StudentListLoading: React.FC = () => {
  return (
    <div>
      {/* Filter skeleton */}
      <div className="mb-6 p-4 border rounded-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>
      
      {/* Table loading skeleton */}
      <div className="border rounded-md overflow-hidden">
        {/* Header */}
        <div className="bg-gray-100 p-3">
          <div className="grid grid-cols-6 gap-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        </div>
        
        {/* Rows */}
        {Array(5).fill(0).map((_, index) => (
          <div key={index} className="border-t p-3">
            <div className="grid grid-cols-6 gap-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-32" />
              </div>
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination skeleton */}
      <div className="mt-4 flex justify-between items-center">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-8 w-64" />
      </div>
    </div>
  );
};

export default StudentListLoading;