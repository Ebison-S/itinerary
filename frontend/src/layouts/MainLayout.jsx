import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-cream">
      <Navbar />
      <main className="px-4 sm:px-6 pb-16 max-w-6xl w-full mx-auto">
        <Outlet />
      </main>
    </div>
  );
}