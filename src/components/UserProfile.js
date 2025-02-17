import React from 'react';

const UserProfile = ({ user }) => {
  return (
    <div className="flex items-center space-x-4">
      <img
        src={user.profilePicture || '/path/to/default-avatar.png'}
        alt="User Avatar"
        className="w-10 h-10 rounded-full"
      />
      <span className="text-lg font-medium">{user.name}</span>
    </div>
  );
};

export default UserProfile;
