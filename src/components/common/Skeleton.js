import React from 'react';

// Base skeleton component
export const Skeleton = ({ className = '', ...props }) => (
  <div
    className={`animate-pulse bg-gray-200 rounded ${className}`}
    {...props}
  />
);

// Card skeleton for blog posts, services, etc.
export const CardSkeleton = () => (
  <div className="bg-white rounded-xl shadow-md overflow-hidden">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-6 space-y-4">
      <Skeleton className="h-4 w-1/4" />
      <Skeleton className="h-6 w-3/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
      <div className="flex items-center gap-4 pt-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  </div>
);

// Consultant card skeleton
export const ConsultantSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
    <div className="bg-gray-200 p-8 flex flex-col items-center">
      <Skeleton className="w-32 h-32 rounded-full" />
      <Skeleton className="h-6 w-32 mt-4" />
      <Skeleton className="h-4 w-24 mt-2" />
    </div>
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3">
        <Skeleton className="h-5 w-5" />
        <Skeleton className="h-4 w-32" />
      </div>
      <div className="flex flex-wrap gap-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  </div>
);

// Service card skeleton
export const ServiceSkeleton = () => (
  <div className="bg-white rounded-xl border border-gray-100 p-6">
    <Skeleton className="w-14 h-14 rounded-xl mb-5" />
    <Skeleton className="h-6 w-2/3 mb-3" />
    <Skeleton className="h-4 w-full mb-2" />
    <Skeleton className="h-4 w-5/6 mb-4" />
    <div className="space-y-2 mb-5">
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-3 w-28" />
      <Skeleton className="h-3 w-20" />
    </div>
    <Skeleton className="h-4 w-24" />
  </div>
);

// Blog detail skeleton
export const BlogDetailSkeleton = () => (
  <div className="min-h-screen bg-gray-50">
    {/* Hero skeleton */}
    <div className="bg-gray-800 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <Skeleton className="h-4 w-24 mb-6 bg-gray-700" />
        <Skeleton className="h-6 w-32 rounded-full mb-4 bg-gray-700" />
        <Skeleton className="h-12 w-full mb-2 bg-gray-700" />
        <Skeleton className="h-12 w-3/4 mb-6 bg-gray-700" />
        <div className="flex gap-6">
          <Skeleton className="h-4 w-24 bg-gray-700" />
          <Skeleton className="h-4 w-24 bg-gray-700" />
          <Skeleton className="h-4 w-24 bg-gray-700" />
        </div>
      </div>
    </div>
    {/* Content skeleton */}
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <Skeleton className="h-96 w-full rounded-xl mb-8" />
      <div className="space-y-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
    </div>
  </div>
);

// Page header skeleton
export const PageHeaderSkeleton = () => (
  <div className="bg-primary-500 py-20">
    <div className="container mx-auto px-4 text-center">
      <Skeleton className="h-4 w-24 mx-auto mb-4 bg-white/20" />
      <Skeleton className="h-10 w-64 mx-auto mb-4 bg-white/20" />
      <Skeleton className="h-4 w-96 mx-auto bg-white/20" />
    </div>
  </div>
);

// Grid skeleton (for multiple cards)
export const GridSkeleton = ({ count = 4, CardComponent = CardSkeleton }) => (
  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
    {[...Array(count)].map((_, index) => (
      <CardComponent key={index} />
    ))}
  </div>
);

export default Skeleton;
