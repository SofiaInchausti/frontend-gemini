'use client';

import React from 'react';

const Loading = () => {
  return (
    <div data-testid="loading" role="status" className="max-w-sm animate-pulse">
      <p className="h-2 bg-gray-300 rounded-full w-48 mb-2.5"></p>
      <p className="h-2 bg-gray-300 rounded-full w-48 mb-2.5"></p>
      <p className="h-2 bg-gray-300 rounded-full w-48 mb-2.5"></p>
      <p className="h-2 bg-gray-300 rounded-full w-48 mb-2.5"></p>
      <p className="h-2 bg-gray-300 rounded-full w-48 mb-2.5"></p>
      <p className="h-2 bg-gray-300 rounded-full w-48 mb-2.5"></p>
    </div>
  );
};
export default Loading;
