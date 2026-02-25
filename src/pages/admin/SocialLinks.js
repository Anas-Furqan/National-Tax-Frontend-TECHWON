import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  MessageCircle,
  Save,
  Loader2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  ExternalLink,
  Eye,
  EyeOff
} from 'lucide-react';
import { socialLinkService } from '../../services/socialLinkService';

const SocialLinks = () => {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [seeding, setSeeding] = useState(false);

  const platformIcons = {
    facebook: Facebook,
    twitter: Twitter,
    instagram: Instagram,
    linkedin: Linkedin,
    youtube: Youtube,
    whatsapp: MessageCircle,
  };

  const platformColors = {
    facebook: 'bg-blue-500',
    twitter: 'bg-sky-500',
    instagram: 'bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500',
    linkedin: 'bg-blue-700',
    youtube: 'bg-red-600',
    whatsapp: 'bg-green-500',
  };

  const platformLabels = {
    facebook: 'Facebook',
    twitter: 'X (Twitter)',
    instagram: 'Instagram',
    linkedin: 'LinkedIn',
    youtube: 'YouTube',
    whatsapp: 'WhatsApp',
  };

  const platforms = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'whatsapp'];

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    setLoading(true);
    try {
      const response = await socialLinkService.getAllSocialLinks();
      // Ensure all platforms are represented
      const allLinks = platforms.map(platform => {
        const existing = response.data.find(l => l.platform === platform);
        return existing || { 
          platform, 
          url: '', 
          isActive: false, 
          order: platforms.indexOf(platform) + 1 
        };
      });
      setLinks(allLinks);
    } catch (error) {
      console.error('Error fetching social links:', error);
      // Initialize with empty values if API fails
      setLinks(platforms.map((platform, index) => ({
        platform,
        url: '',
        isActive: false,
        order: index + 1,
      })));
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (platform, url) => {
    setLinks(links.map(link => 
      link.platform === platform ? { ...link, url } : link
    ));
  };

  const handleToggleActive = async (platform) => {
    const link = links.find(l => l.platform === platform);
    const newActive = !link.isActive;
    
    setLinks(links.map(l => 
      l.platform === platform ? { ...l, isActive: newActive } : l
    ));

    try {
      await socialLinkService.upsertSocialLink({
        platform,
        url: link.url || 'https://example.com',
        isActive: newActive,
        order: link.order,
      });
      showMessage('success', `${platformLabels[platform]} ${newActive ? 'enabled' : 'disabled'}`);
      // Refresh data from server
      await fetchLinks();
    } catch (error) {
      console.error('Toggle error:', error);
      // Revert on error
      setLinks(links.map(l => 
        l.platform === platform ? { ...l, isActive: !newActive } : l
      ));
      showMessage('error', 'Failed to update status: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSave = async (platform) => {
    const link = links.find(l => l.platform === platform);
    if (!link.url.trim()) {
      showMessage('error', 'Please enter a valid URL');
      return;
    }

    setSaving(platform);
    try {
      const result = await socialLinkService.upsertSocialLink({
        platform,
        url: link.url,
        isActive: link.isActive !== undefined ? link.isActive : true,
        order: link.order || platforms.indexOf(platform) + 1,
      });
      console.log('Save result:', result);
      showMessage('success', `${platformLabels[platform]} updated successfully`);
      // Refresh data from server to ensure sync
      await fetchLinks();
    } catch (error) {
      console.error('Save error:', error);
      showMessage('error', 'Failed to save changes: ' + (error.response?.data?.message || error.message));
    } finally {
      setSaving(null);
    }
  };

  const handleSeedDefaults = async () => {
    if (!window.confirm('This will reset all social links to default values. Continue?')) {
      return;
    }

    setSeeding(true);
    try {
      const response = await socialLinkService.seedSocialLinks();
      setLinks(response.data.map(link => link));
      showMessage('success', 'Default social links restored');
    } catch (error) {
      showMessage('error', 'Failed to seed defaults');
    } finally {
      setSeeding(false);
    }
  };

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-primary-500" size={40} />
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-secondary-500">Social Media Links</h1>
          <p className="text-gray-600">Manage your social media presence on the website</p>
        </div>
        <button
          onClick={handleSeedDefaults}
          disabled={seeding}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
        >
          {seeding ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <RefreshCw size={18} />
          )}
          Reset to Defaults
        </button>
      </div>

      {/* Message Toast */}
      {message.text && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
            message.type === 'success' 
              ? 'bg-green-50 text-green-700 border border-green-200' 
              : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          {message.text}
        </motion.div>
      )}

      {/* Social Links Grid */}
      <div className="grid gap-4">
        {links.map((link) => {
          const Icon = platformIcons[link.platform];
          return (
            <motion.div
              key={link.platform}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-white rounded-xl border p-6 ${
                link.isActive ? 'border-primary-200' : 'border-gray-200'
              }`}
            >
              <div className="flex flex-wrap items-center gap-4">
                {/* Platform Icon */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white ${platformColors[link.platform]}`}>
                  <Icon size={24} />
                </div>

                {/* Platform Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold text-secondary-500">
                      {platformLabels[link.platform]}
                    </h3>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      link.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {link.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2">
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => handleUrlChange(link.platform, e.target.value)}
                      placeholder={`Enter ${platformLabels[link.platform]} URL`}
                      className="flex-1 min-w-[200px] px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-200 focus:border-primary-500 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  {link.url && (
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 text-gray-400 hover:text-primary-500 transition-colors"
                      title="Open link"
                    >
                      <ExternalLink size={18} />
                    </a>
                  )}
                  
                  <button
                    onClick={() => handleToggleActive(link.platform)}
                    className={`p-2 rounded-lg transition-colors ${
                      link.isActive 
                        ? 'text-green-500 hover:bg-green-50' 
                        : 'text-gray-400 hover:bg-gray-100'
                    }`}
                    title={link.isActive ? 'Disable' : 'Enable'}
                  >
                    {link.isActive ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>

                  <button
                    onClick={() => handleSave(link.platform)}
                    disabled={saving === link.platform}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors text-sm"
                  >
                    {saving === link.platform ? (
                      <Loader2 className="animate-spin" size={16} />
                    ) : (
                      <Save size={16} />
                    )}
                    Save
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Info Box */}
      <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-xl">
        <h4 className="font-semibold text-blue-800 mb-2">How it works</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Only active links will be displayed on the website's social media widget</li>
          <li>• Make sure to enter valid URLs (e.g., https://facebook.com/yourpage)</li>
          <li>• For WhatsApp, use the format: https://wa.me/923451234567</li>
          <li>• Changes are saved individually per platform</li>
        </ul>
      </div>
    </div>
  );
};

export default SocialLinks;
