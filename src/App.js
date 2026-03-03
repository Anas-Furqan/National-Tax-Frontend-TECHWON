import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout
import Layout from './components/layout/Layout';

// Public Pages
import Home from './pages/Home';
import Blog from './pages/Blog';
import BlogDetail from './pages/BlogDetail';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import News from './pages/News';

// Admin Pages
import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import BlogList from './pages/admin/BlogList';
import BlogEditor from './pages/admin/BlogEditor';
import Consultations from './pages/admin/Consultations';
import Subscribers from './pages/admin/Subscribers';
import ConsultantManager from './pages/admin/ConsultantManager';
import SocialLinks from './pages/admin/SocialLinks';
import NewsManager from './pages/admin/NewsManager';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogDetail />} />
            <Route path="news" element={<News />} />
          </Route>

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="blogs" element={<BlogList />} />
            <Route path="blogs/new" element={<BlogEditor />} />
            <Route path="blogs/edit/:id" element={<BlogEditor />} />
            <Route path="consultations" element={<Consultations />} />
            <Route path="subscribers" element={<Subscribers />} />
            <Route path="consultants" element={<ConsultantManager />} />
            <Route path="social-links" element={<SocialLinks />} />
            <Route path="news" element={<NewsManager />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
