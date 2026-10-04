import React from 'react';

export interface ToolWorkspaceProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
}

export const ToolWorkspace: React.FC<ToolWorkspaceProps> = ({
  leftContent,
  rightContent,
  className = '',
}) => {
  return (
    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 items-start text-left ${className}`}>
      {/* LEFT: File / Input Workspace */}
      <div className="lg:col-span-7 xl:col-span-8 space-y-4">
        {leftContent}
      </div>

      {/* RIGHT: Options & Processing Controls */}
      <div className="lg:col-span-5 xl:col-span-4 border border-border rounded-lg bg-white p-5 space-y-5">
        {rightContent}
      </div>
    </div>
  );
};

export default ToolWorkspace;
