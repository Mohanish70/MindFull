// src/components/ShareJourney.js
import axios from 'axios';
import React, { useState } from 'react';

const ShareJourney = () => {
  const [postContent, setPostContent] = useState('');
  const [postImage, setPostImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('content', postContent);
    if (postImage) formData.append('image', postImage);

    try {
      await axios.post('/api/journals/shareJourney', formData);
      alert('Journey shared successfully!');
    } catch (error) {
      console.error('Error sharing journey', error);
    }
  };

  return (
    <form id="shareJourneyForm" onSubmit={handleSubmit}>
      <textarea
        id="postContent"
        placeholder="Share your experience or tips"
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
      />
      <input
        type="file"
        id="postImage"
        accept="image/*"
        onChange={(e) => setPostImage(e.target.files[0])}
      />
      <button type="submit">Share</button>
    </form>
  );
};

export default ShareJourney;
