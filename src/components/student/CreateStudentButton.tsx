import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

export const CreateStudentButton: React.FC = () => {
  return (
    <Link href="/students/create">
      <Button className="flex items-center gap-2">
        <PlusCircle className="h-4 w-4" />
        Add Student
      </Button>
    </Link>
  );
};