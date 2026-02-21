import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FileText, 
  MessageSquare, 
  Users, 
  TrendingUp,
  Eye,
  Clock,
  AlertCircle
} from 'lucide-react';
import { consultationService } from '../../services/consultationService';
import { blogService } from '../../services/blogService';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [recentConsultations, setRecentConsultations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, consultationsRes] = await Promise.all([
          consultationService.getStats(),
          consultationService.getConsultations({ limit: 5 }),
        ]);
        
        setStats(statsRes.data);
        setRecentConsultations(consultationsRes.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Total Consultations',
      value: stats?.total || 0,
      icon: MessageSquare,
      color: 'bg-blue-500',
      change: `+${stats?.todayCount || 0} today`,
    },
    {
      title: 'Pending Review',
      value: stats?.pending || 0,
      icon: Clock,
      color: 'bg-yellow-500',
      change: 'Awaiting response',
    },
    {
      title: 'Urgent Cases',
      value: stats?.urgent || 0,
      icon: AlertCircle,
      color: 'bg-red-500',
      change: 'Need immediate attention',
    },
    {
      title: 'Newsletter Subs',
      value: '-',
      icon: Users,
      color: 'bg-green-500',
      change: 'Active subscribers',
    },
  ];

  if (loading) {
    return (
      <div className="animate-pulse space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 h-32"></div>
          ))}
        </div>
        <div className="bg-white rounded-xl p-6 h-96"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-heading font-bold text-secondary-500">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-3xl font-bold text-secondary-500 mt-1">{stat.value}</p>
                <p className="text-xs text-gray-400 mt-2">{stat.change}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="text-white" size={24} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Consultations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm"
      >
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-heading font-semibold text-secondary-500">
              Recent Consultations
            </h2>
            <Link
              to="/admin/consultations"
              className="text-primary-500 text-sm font-medium hover:underline"
            >
              View All
            </Link>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Service
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentConsultations.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    No consultations yet
                  </td>
                </tr>
              ) : (
                recentConsultations.map((consultation) => (
                  <tr key={consultation._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-secondary-500">{consultation.name}</p>
                        <p className="text-sm text-gray-500">{consultation.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {consultation.serviceType || 'General'}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          consultation.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : consultation.status === 'Reviewed'
                            ? 'bg-blue-100 text-blue-700'
                            : consultation.status === 'Resolved'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {consultation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-sm">
                      {new Date(consultation.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6">
        <Link
          to="/admin/blogs/new"
          className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
        >
          <FileText size={32} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">Create New Blog Post</h3>
          <p className="text-white/80 text-sm">
            Write and publish a new article for your blog
          </p>
        </Link>

        <Link
          to="/admin/consultations"
          className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl p-6 text-white hover:shadow-lg transition-shadow"
        >
          <MessageSquare size={32} className="mb-4" />
          <h3 className="text-xl font-semibold mb-2">Review Consultations</h3>
          <p className="text-white/80 text-sm">
            {stats?.pending || 0} pending consultations awaiting review
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
