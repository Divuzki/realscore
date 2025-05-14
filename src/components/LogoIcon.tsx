import React from 'react';
import { BrainCircuit } from 'lucide-react';

interface LogoIconProps {
  className?: string;
}

const LogoIcon: React.FC<LogoIconProps> = ({ className }) => {
  return <BrainCircuit className={className} />;
};

export default LogoIcon;