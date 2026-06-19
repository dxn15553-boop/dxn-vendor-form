
import React from 'react';
import SectionTitle from '../components/SectionTitle';
import { useContent } from '../context/ContentContext';
import { Quote, Globe, Linkedin, Mail } from 'lucide-react';

const Team: React.FC = () => {
  const { content } = useContent();
  const team = content.team || [];

  return (
    <div className="bg-neutral-950 text-neutral-300 min-h-screen">
      <section className="pt-36 pb-20 md:pb-32 px-6 md:px-12 max-w-[1440px] mx-auto">
        <SectionTitle subtitle="Governance" title="Global Leadership" light />
        <p className="text-2xl text-neutral-400 font-light leading-relaxed max-w-4xl">
          The visionaries behind DXN's 'One World One Market' philosophy. Our leadership combines decades of expertise in mycology, manufacturing, and global business strategy.
        </p>
      </section>

      <section className="max-w-[1440px] mx-auto px-6 md:px-12 pb-20 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24">
          {team.map((member: any, idx: number) => (
            <div key={idx} className="group relative">
              <div className="aspect-[3/4] overflow-hidden bg-neutral-900 mb-8 border-b-4 border-red-600 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
                  <div className="flex gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {member.linkedin && member.linkedin !== '#' && (
                      <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white text-black flex items-center justify-center hover:bg-red-600 hover:text-white transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.email && (
                      <a href={`mailto:${member.email}`} className="w-10 h-10 bg-neutral-900 border border-white/20 text-white flex items-center justify-center hover:bg-red-600 hover:border-red-600 transition-colors">
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <h3 className="text-3xl font-black uppercase tracking-tighter text-white mb-2">{member.name}</h3>
              <p className="text-red-600 text-xs font-black uppercase tracking-[0.3em] border-l-2 border-red-600 pl-3">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Team;
