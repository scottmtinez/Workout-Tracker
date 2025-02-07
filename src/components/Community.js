import React, { useState, useEffect } from 'react';
import './Community.css';

function Community() {
  // State for posts
  const [posts, setPosts] = useState([]);

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

  return (
    <div className='Community-container'>
      <h2 className='Community-title'>The Community</h2>
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
    </div>
  );
}

export default Community;
