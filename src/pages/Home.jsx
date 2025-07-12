import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Rocket,
  ClipboardEdit,
  Upload,
  FolderOpen,
  LineChart
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  const navItems = [
    {
      label: 'Onboarding',
      path: '/onboarding',
      icon: <ClipboardEdit size={32} className="text-indigo-600" />,
      description: 'Enter personal details, preferences and start your career journey.'
    },
    {
      label: 'Upload Quiz',
      path: '/upload',
      icon: <Upload size={32} className="text-indigo-600" />,
      description: 'Input or describe your conversations with peers.'
    },
    {
      label: 'Add Project',
      path: '/add-project',
      icon: <Rocket size={32} className="text-indigo-600" />,
      description: 'Create a new project with skills and people involved.'
    },
    {
      label: 'Simulate & View',
      path: '/simulate',
      icon: <LineChart size={32} className="text-indigo-600" />,
      description: 'View current projects, run simulations, and get predictions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-12">
      {/* Hero Section */}
      <div className="text-center mb-14">
        <h1 className="text-5xl font-extrabold text-indigo-800 mb-3 flex justify-center items-center gap-3">
          <Rocket className="text-pink-500" size={36} />
          Corporate Climber
        </h1>
        <p className="text-gray-700 text-lg max-w-2xl mx-auto">
          Navigate your career using intelligent simulations, interaction analysis,
          and optimal project guidance.
        </p>
      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {navItems.map((item, index) => (
          <div
            key={index}
            onClick={() => navigate(item.path)}
            
            className="cursor-pointer bg-white/10 backdrop-blur-lg border border-indigo-200 shadow-lg hover:shadow-2xl transition-all duration-300 p-6 rounded-xl flex flex-col items-center text-center gap-3"

          >
            {item.icon}
            <h3 className="text-xl font-semibold text-indigo-800">{item.label}</h3>
            <p className="text-gray-600 text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Tree Visualization Placeholder */}
      <div className="mt-20 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-indigo-800">📈 Your Career Path</h2>
        <div className="max-w-5xl mx-auto h-[500px] overflow-auto border-2 border-dashed border-indigo-300 rounded-lg p-6 bg-white">
          <p className="text-gray-500 mb-4">
            Tree visualization of your project decisions will appear here.
          </p>
          <img
            src="/tree-placeholder.png"
            alt="Tree Placeholder"
            className="w-full mt-4 rounded shadow"
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
