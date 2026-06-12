
import React from 'react';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  light?: boolean;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, light }) => {
  return (
    <div className="mb-16">
      {subtitle && (
        <span className={`uppercase tracking-[0.3em] text-xs font-bold mb-4 block ${light ? 'text-red-400' : 'text-red-600'}`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-4xl md:text-6xl font-bold tracking-tighter uppercase leading-none ${light ? 'text-white' : 'text-neutral-900'}`}>
        {title}
      </h2>
      <div className={`h-1.5 w-24 mt-8 ${light ? 'bg-red-600' : 'bg-red-600'}`}></div>
    </div>
  );
};

export default SectionTitle;
