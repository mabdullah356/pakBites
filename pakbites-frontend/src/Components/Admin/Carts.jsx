import React from 'react';

function Carts() {
  return (
    <div className="p-4">
      <h1 className='text-3xl font-bold text-start font-[outline] mb-4'>Carts</h1>
      <div className="p-6 bg-white shadow-md rounded-lg border border-gray-200">
        <h2 className="text-xl font-semibold mb-2 text-amber-600">Client-Side Cart Only</h2>
        <p className="text-gray-600">
          The application has been updated to use strictly client-side carts (localStorage) for privacy and performance.
          Admins can no longer view user carts in real-time. User carts are converted to Orders upon checkout.
        </p>
      </div>
    </div>
  );
}

export default Carts;
