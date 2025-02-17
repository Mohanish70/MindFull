import React from 'react';

const Header = ({ user }) => {
  return (
    <header className="bg-blue-900 text-white py-16">
      <div className="container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to MindWell</h1>
        <p className="text-xl mb-8">Unlock your full potential with mindfulness, therapy, and self-care resources.</p>
        
        {/* Display user's name if logged in */}
        {user && (
          <div className="mb-4">
            <img
              src={user.profilePicture || '/path/to/default-avatar.png'}
              alt="User Avatar"
              className="w-16 h-16 rounded-full border-2 border-gray-300 mx-auto"
            />
            <p className="text-2xl mt-4">{user.name}</p>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
