const fs = require('fs');
const file = 'd:/Layasri/Website/Deployment/dxn-india-manufacturing---global-flagship/pages/Admin.tsx';
let content = fs.readFileSync(file, 'utf8');

const regex = /<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">\s*\{\/\* Sidebar \*\/\}\s*(<InputGroup label="Main Headline")/m;

const replacement = `<div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
               {/* Sidebar */}
               <div className="lg:col-span-3 space-y-2">
                  {[
                     { id: 'home', label: 'Home Page', icon: Layout },
                     { id: 'divisions', label: 'Divisions', icon: Database },
                     { id: 'team', label: 'Leadership', icon: Users },
                     { id: 'products', label: 'Catalog', icon: Package },
                     { id: 'vendors', label: 'Vendors', icon: Truck },
                     { id: 'gallery', label: 'Gallery', icon: ImageIcon },
                     { id: 'events', label: 'Events', icon: Calendar },
                     { id: 'timeline', label: 'Timeline', icon: RefreshCw },
                     { id: 'roadmap', label: 'Roadmap', icon: BarChart3 },
                     { id: 'careers', label: 'Careers', icon: Briefcase },
                     { id: 'contact', label: 'Contact Info', icon: MapPin },
                  ].map((tab) => (
                     <button key={tab.id} onClick={() => setActiveTab(tab.id as any)} className={\`w-full flex items-center justify-between p-5 text-[11px] font-black uppercase tracking-widest transition-all border \${activeTab === tab.id ? 'bg-red-600 border-red-600 text-white shadow-lg' : 'bg-neutral-900/50 border-white/5 text-neutral-400 hover:text-white'}\`}>
                        <div className="flex items-center gap-4"><tab.icon className="w-4 h-4" /> {tab.label}</div>
                     </button>
                  ))}
               </div>

               {/* Main Content */}
               <div className="lg:col-span-9 bg-neutral-900 border border-white/5 p-12">

                  {/* HOME TAB */}
                  {activeTab === 'home' && (
                     <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4">
                        <div>
                           <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-6 border-b border-white/5 pb-4">Hero Section</h3>
                           <div className="grid gap-6">
                              $1`;

content = content.replace(regex, replacement);

fs.writeFileSync(file, content, 'utf8');
console.log('Fixed file.');
