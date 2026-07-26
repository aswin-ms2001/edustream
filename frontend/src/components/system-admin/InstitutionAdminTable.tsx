"use client";

import React from 'react';
import Link from 'next/link';
import {
  MoreHorizontal,
  Eye,
  Edit3,
  MailPlus,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { InstitutionAdmin } from '@/types/system-admin';

interface InstitutionAdminTableProps {
  admins: InstitutionAdmin[];
  onEditName: (admin: InstitutionAdmin) => void;
  onSuspend: (admin: InstitutionAdmin) => void;
  onActivate: (admin: InstitutionAdmin) => void;
  onResendInvitation: (admin: InstitutionAdmin) => void;
}

export default function InstitutionAdminTable({
  admins,
  onEditName,
  onSuspend,
  onActivate,
  onResendInvitation,
}: InstitutionAdminTableProps) {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            Active
          </span>
        );
      case 'PENDING_ACTIVATION':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-600 dark:text-amber-400">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            Pending Activation
          </span>
        );
      case 'SUSPENDED':
        return (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/10 px-2.5 py-0.5 text-xs font-semibold text-rose-600 dark:text-rose-400">
            <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
            Suspended
          </span>
        );
      default:
        return <span className="text-xs text-muted-foreground">{status}</span>;
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-muted/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-6 py-4">Name</th>
            <th className="px-6 py-4">Email</th>
            <th className="px-6 py-4">Account Status</th>
            <th className="px-6 py-4">Invitation Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {admins.map((admin) => (
            <tr key={admin.id} className="transition-colors hover:bg-muted/30">
              <td className="px-6 py-4 font-semibold text-foreground">
                <Link
                  href={`/system-admin/institution-admins/${admin.id}`}
                  className="hover:underline hover:text-primary"
                >
                  {admin.name}
                </Link>
              </td>
              <td className="px-6 py-4 text-muted-foreground">{admin.email}</td>
              <td className="px-6 py-4">{getStatusBadge(admin.status)}</td>
              <td className="px-6 py-4">
                {admin.status === 'PENDING_ACTIVATION' ? (
                  admin.hasPendingInvitation ? (
                    <span className="text-xs font-medium text-amber-600">Pending Acceptance</span>
                  ) : (
                    <span className="text-xs font-medium text-muted-foreground">Invitation Expired</span>
                  )
                ) : (
                  <span className="text-xs font-medium text-emerald-600">Accepted</span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link href={`/system-admin/institution-admins/${admin.id}`} className="w-full cursor-pointer">
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => onEditName(admin)} className="cursor-pointer">
                      <Edit3 className="mr-2 h-4 w-4" />
                      Edit Name
                    </DropdownMenuItem>

                    {admin.status === 'PENDING_ACTIVATION' && (
                      <DropdownMenuItem onClick={() => onResendInvitation(admin)} className="cursor-pointer">
                        <MailPlus className="mr-2 h-4 w-4 text-amber-600" />
                        Resend Invitation
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />

                    {admin.status !== 'SUSPENDED' ? (
                      <DropdownMenuItem
                        onClick={() => onSuspend(admin)}
                        className="cursor-pointer text-destructive focus:text-destructive"
                      >
                        <ShieldAlert className="mr-2 h-4 w-4" />
                        Suspend Account
                      </DropdownMenuItem>
                    ) : (
                      <DropdownMenuItem
                        onClick={() => onActivate(admin)}
                        className="cursor-pointer text-emerald-600 focus:text-emerald-600"
                      >
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        Activate Account
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
}
