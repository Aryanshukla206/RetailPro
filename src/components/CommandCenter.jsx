import React, { useState } from 'react';
import { Command, Search, Bell, Settings , X} from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

export default function CommandCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  // const navigate = useNavigate();
  // const handleNavigateHome = () => {
  //   navigate('/abc'); // Navigates to the home page
  // };
  return (
    <div className="relative">
      {/* Command Trigger */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <Command className="h-6 w-6" />
      </button>

      {/* Command Palette */}
      {isOpen && (
        
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50">
          <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-lg shadow-2xl">
            <div className="p-4">
                  
              <div className="flex items-center space-x-2 px-3 py-2 bg-gray-50 rounded-lg">
                <Search className="h-5 w-5 text-gray-400" />
                
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search or type a command..."
                  className="flex-1 bg-transparent border-none outline-none placeholder:text-gray-400"
                  autoFocus
                />
                <kbd className="px-2 py-1 text-xs bg-white rounded border border-gray-200 text-gray-500">
                  ESC
                </kbd>
                <X size={20} color="red" />
              </div>

              <div className="mt-4 max-h-[60vh] overflow-auto">
                {/* Quick Actions */}
                <div className="px-2 py-3 border-b">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase">Quick Actions</h3>
                  <div className="mt-2 space-y-1">
                    {['Add Product', 'New Sale', 'Generate Invoice', 'View Reports'].map((action) => (
                      <button
                        key={action}
                        className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Items */}
                <div className="px-2 py-3">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase">Recent Items</h3>
                  <div className="mt-2 space-y-1">
                    {['iPhone 13 Pro', 'Samsung TV', 'Nike Shoes'].map((item) => (
                      <button
                        key={item}
                        className="w-full px-3 py-2 text-left text-gray-700 hover:bg-gray-100 rounded-md"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}