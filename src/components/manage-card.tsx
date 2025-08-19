import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Film, LucideIcon } from 'lucide-react';
import { cn } from '~/lib/utils';
import Link from 'next/link';

type ManageCardProps = {
  className?: string;
  title: string;
  description: string;
  Icon?: LucideIcon;
  iconClassName?: string;
  href: string;
};

function ManageCard({
  className,
  description,
  title,
  Icon,
  iconClassName,
  href,
}: ManageCardProps) {
  return (
    <Link href={href ?? "/"} className='active:opacity-50'>
      <Card
        className={cn(
          'bg-ui-600 from-base-black to-ui-900 border-ui-600 text-base-white gap-0.5 border bg-gradient-to-r',
          className,
        )}
      >
        <CardHeader>
          <div className="flex flex-row items-center gap-2">
            {Icon && <Icon className={cn('h-6 w-6', iconClassName)} />}
            <CardTitle className="text-base-white text-lg">{title}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-ui-400">
            {description}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ManageCard;
