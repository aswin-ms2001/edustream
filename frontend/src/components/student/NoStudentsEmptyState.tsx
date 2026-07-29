'use client';

import React from 'react';
import { GraduationCap } from 'lucide-react';

export const NoStudentsEmptyState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-slate-300 p-12 text-center bg-white">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400 mb-4">
        <GraduationCap className="h-8 w-8" />
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-1">No Students Registered</h3>
      <p className="max-w-md text-sm text-slate-500 mb-6">
        There are currently no students registered in your institution. Students register themselves via public signup or Google OAuth.
      </p>
    </div>
  );
};
