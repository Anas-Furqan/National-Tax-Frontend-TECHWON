import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  MessageSquare, 
  Users, 
  LogOut,
  Menu,
  X,
  UserCircle,
  Share2,
  Newspaper
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useState } from 'react';

const AdminLayout = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { name: 'Blog Posts', icon: FileText, href: '/admin/blogs' },
    { name: 'News & Circulars', icon: Newspaper, href: '/admin/news' },
    { name: 'Consultations', icon: MessageSquare, href: '/admin/consultations' },
    { name: 'Subscribers', icon: Users, href: '/admin/subscribers' },
    { name: 'Consultants', icon: UserCircle, href: '/admin/consultants' },
    { name: 'Social Links', icon: Share2, href: '/admin/social-links' },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-secondary-500 text-white p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary-500 rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">NTL</span>
          </div>
          <span className="font-semibold">Admin Panel</span>
        </div>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-secondary-500 transform transition-transform lg:transform-none ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-white/10 hidden lg:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">NTL</span>
                </div>
                <div>
                  <h2 className="text-white font-semibold">Admin Panel</h2>
                  <p className="text-gray-400 text-xs">National Tax Law</p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <item.icon size={20} />
                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* User */}
            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user?.name?.charAt(0) || 'A'}
                  </span>
                </div>
                <div>
                  <p className="text-white font-medium">{user?.name || 'Admin'}</p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors w-full px-4 py-2 rounded-lg hover:bg-white/5"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </aside>

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen">
          <div className="p-6 lg:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
