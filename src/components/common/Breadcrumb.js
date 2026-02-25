import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items = [], className = '' }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs from URL if no items provided
  const generateBreadcrumbs = () => {
    if (items.length > 0) return items;

    const pathnames = location.pathname.split('/').filter((x) => x);
    const breadcrumbs = [{ label: 'Home', href: '/' }];

    let currentPath = '';
    pathnames.forEach((name, index) => {
      currentPath += `/${name}`;
      const label = name.charAt(0).toUpperCase() + name.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({
        label,
        href: currentPath,
        isCurrentPage: index === pathnames.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  // Check if dark mode (transparent bg indicates dark section)
  const isDark = className.includes('bg-transparent');

  return (
    <nav aria-label="Breadcrumb" className={`py-4 ${className}`}>
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {breadcrumbs.map((item, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <ChevronRight size={14} className={isDark ? 'text-gray-500' : 'text-gray-400'} />
            )}
            {item.isCurrentPage ? (
              <span className={isDark ? 'text-white font-medium' : 'text-primary-600 font-medium'}>
                {item.label}
              </span>
            ) : (
              <Link
                to={item.href}
                className={`transition-colors flex items-center gap-1 ${
                  isDark 
                    ? 'text-gray-400 hover:text-white' 
                    : 'text-gray-500 hover:text-primary-500'
                }`}
              >
                {index === 0 && <Home size={14} />}
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
