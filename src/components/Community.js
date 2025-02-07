import React, { useState, useEffect } from 'react';
import './Community.css';

function Community() {
  // State for posts
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Fetch posts from MongoDB when component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/posts');
        const data = await response.json();
        setPosts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };
    fetchPosts();
  }, []);

  // Handle Post Submit
  const handlePostSubmit = async () => {
    if (newPost.trim() === '') return;

    const post = {
      username: 'Anonymous', // Replace with actual user data if available
      content: newPost,
    };

    try {
      const response = await fetch('http://localhost:5000/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });

      if (response.ok) {
        const savedPost = await response.json();
        setPosts([...posts, savedPost]);
        setNewPost('');
      } else {
        console.error('Failed to save post');
      }
    } catch (error) {
      console.error('Error submitting post:', error);
    }
  };

  return (
    <div className='Community-container'>
      <h2 className='Community-title'>The Community</h2>

      {/* Display Posts */}
      <div className='Community-posts'>
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className='Community-post'>
              <p>
                <span>{post.content}</span><br />
                <span className='Community-post-user'>{post.username}</span>
              </p>
            </div>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>

      {/* Post Creation Section */}
      <div className='Community-new-post'>
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder='Write a new post...'
        />
        <button onClick={handlePostSubmit}>Post</button>
      </div>
      
    </div>
  );
}

export default Community;
