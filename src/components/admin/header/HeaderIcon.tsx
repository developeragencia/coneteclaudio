
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface HeaderIconProps {
  Icon: LucideIcon;
}

const HeaderIcon = ({ Icon }: HeaderIconProps) => {
  return (
    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary shadow-sm ring-1 ring-primary/5">
      <Icon className="h-5 w-5" />
    </div>
  );
};

export default HeaderIcon;
