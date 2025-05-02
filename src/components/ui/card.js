import React from 'react';

export default function Card({ children }) {
    return (
      <div className="rounded-xl shadow p-4 border bg-white">
        {children}
      </div>
    );
  }