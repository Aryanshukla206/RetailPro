import React from 'react';
import { BarChart3, TrendingUp, DollarSign, Package, X } from 'lucide-react';

export default function Reports() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Reports & Analytics</h1>
      
      {/* Stats Grid */}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Sales', value: '₹45,231', icon: DollarSign, color: 'bg-green-500' },
          { label: 'Products Sold', value: '142', icon: Package, color: 'bg-blue-500' },
          { label: 'Growth', value: '+12.5%', icon: TrendingUp, color: 'bg-indigo-500' },
          { label: 'Revenue', value: '₹89,432', icon: BarChart3, color: 'bg-purple-500' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`${color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{label}</p>
                <p className="text-2xl font-semibold text-gray-900">{value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sales Overview</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Sales Chart Placeholder</span>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Top Products</h2>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <span className="text-gray-500">Products Chart Placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
}