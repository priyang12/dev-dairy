import React from 'react';
import Navbar from '../components/Navbar';

function Navlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="top">
      <Navbar />
      {children}
    </div>
  );
}

export default Navlayout;
