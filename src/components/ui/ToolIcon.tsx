import React from 'react';
import {
  Files,
  Scissors,
  Minimize2,
  RotateCw,
  Copy,
  Trash2,
  FileImage,
  Stamp,
  Lock,
  FileText,
  Table,
  Presentation,
  SearchCheck,
  FileSpreadsheet,
  FileCode,
  ImageDown,
  Maximize,
  Crop,
  Repeat,
  QrCode,
  Barcode,
  CaseSensitive,
  Sparkles,
  Braces,
  TableProperties,
  Archive,
  Key,
  Hash,
  Clock,
  Palette,
  Info,
  Wrench,
  LucideProps,
} from 'lucide-react';

const iconMap: Record<string, React.FC<LucideProps>> = {
  Files,
  Scissors,
  Minimize2,
  RotateCw,
  Copy,
  Trash2,
  FileImage,
  Stamp,
  Lock,
  FileText,
  Table,
  Presentation,
  SearchCheck,
  FileSpreadsheet,
  FileCode,
  ImageDown,
  Maximize,
  Crop,
  Repeat,
  QrCode,
  Barcode,
  CaseSensitive,
  Sparkles,
  Braces,
  TableProperties,
  Archive,
  Key,
  Hash,
  Clock,
  Palette,
  Info,
};

export interface ToolIconProps extends LucideProps {
  name: string;
}

export const ToolIcon: React.FC<ToolIconProps> = ({ name, className = 'w-4 h-4', ...props }) => {
  const IconComponent = iconMap[name] || Wrench;
  return <IconComponent className={className} {...props} />;
};

export default ToolIcon;
