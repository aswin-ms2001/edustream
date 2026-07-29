'use client';

import React from 'react';
import Link from 'next/link';
import type { StudentSummary } from '@/types/student';
import {
  MoreHorizontal,
  Eye,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface StudentTableProps {
  students: StudentSummary[];
  onSuspend: (student: StudentSummary) => void;
  onUnsuspend: (student: StudentSummary) => void;
}

export const StudentTable: React.FC<StudentTableProps> = ({
  students,
  onSuspend,
  onUnsuspend,
}) => {
  return (
    <div className="w-full overflow-x-auto rounded-md border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500 border-b border-slate-200">
          <tr>
            <th scope="col" className="px-6 py-3 font-semibold">Name</th>
            <th scope="col" className="px-6 py-3 font-semibold">Email</th>
            <th scope="col" className="px-6 py-3 font-semibold">Auth Provider</th>
            <th scope="col" className="px-6 py-3 font-semibold">Status</th>
            <th scope="col" className="px-6 py-3 font-semibold">Joined Date</th>
            <th scope="col" className="px-6 py-3 font-semibold text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {students.map((student) => (
            <tr key={student.id} className="hover:bg-slate-50/80 transition-colors">
              <td className="px-6 py-4 font-medium text-slate-900">
                <Link
                  href={`/institution/students/${student.id}`}
                  className="hover:text-blue-600 hover:underline transition-colors"
                >
                  {student.name}
                </Link>
              </td>
              <td className="px-6 py-4 text-slate-600">{student.email}</td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                    student.authProvider === 'GOOGLE'
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : 'bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {student.authProvider}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border ${
                    student.status === 'ACTIVE'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-rose-50 text-rose-700 border-rose-200'
                  }`}
                >
                  {student.status}
                </span>
              </td>
              <td className="px-6 py-4 text-slate-500">
                {student.createdAt ? new Date(student.createdAt).toLocaleDateString() : '—'}
              </td>
              <td className="px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-500 hover:text-slate-900">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link href={`/institution/students/${student.id}`} className="cursor-pointer">
                        <Eye className="mr-2 h-4 w-4 text-slate-500" />
                        View Details
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {student.status === 'ACTIVE' ? (
                      <DropdownMenuItem
                        onClick={() => onSuspend(student)}
                        className="cursor-pointer text-rose-600 focus:text-rose-600 focus:bg-rose-50"
                      >
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        Suspend Student
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => onUnsuspend(student)}
                        className="cursor-pointer text-emerald-600 focus:text-emerald-600 focus:bg-emerald-50"
                      >
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Unsuspend Student
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
