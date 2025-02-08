import React, { useState, useEffect } from 'react';
import './Community.css';

function Community() {
  // State for posts
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState('');
    const [newComment, setNewComment] = useState({});
    const [user, setUser] = useState(null);

  // Fetch posts from Express when component mounts
    useEffect(() => {
      fetchPosts();
    }, []);
  
    const fetchPosts = async () => {
      try {
        const response = await fetch('/posts');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

  // Load user data from localStorage when the component mounts
      useEffect(() => {
          const savedUser = localStorage.getItem('user');
          if (savedUser) {
              setUser(JSON.parse(savedUser));
          }
      }, []);

  // Save user data to localStorage when the user state changes
      useEffect(() => {
          if (user) {
              localStorage.setItem('user', JSON.stringify(user)); // Save user data to localStorage
          } else {
              localStorage.removeItem('user'); // Remove user data from localStorage when the user logs out
          }
      }, [user]);

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
        username: user?.username || 'Anonymous', // Use the logged-in user's username if available
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

  // Handle comment submission
    const handleCommentSubmit = async (postId) => {
      if (!newComment[postId] || newComment[postId].trim() === '') return;
  
      try {
        const response = await fetch(`http://localhost:5000/posts/${postId}/comment`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user?.username, content: newComment[postId] }),
        });
  
        if (response.ok) {
          const updatedPost = await response.json();
          setPosts(posts.map((post) => (post._id === postId ? updatedPost : post)));
          setNewComment({ ...newComment, [postId]: '' });
        }
      } catch (error) {
        console.error('Error submitting comment:', error);
      }
    };

  // Handle post deletion
    const handleDeletePost = async (postId) => {
      try {
        const response = await fetch(`http://localhost:5000/posts/${postId}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          setPosts(posts.filter((post) => post._id !== postId));
        } else {
          console.error('Failed to delete post');
        }
      } catch (error) {
        console.error('Error deleting post:', error);
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

              {/* Display comments */}
              <div className='Community-comments'>
                {post.comments?.map((comment, index) => (
                  <p key={index}><strong>{comment.username}</strong>: {comment.content}</p>
                ))}
              </div>

              {/* Comment input */}
              <textarea
                className='Community-comment-input'
                value={newComment[post._id] || ''}
                onChange={(e) => setNewComment({ ...newComment, [post._id]: e.target.value })}
                placeholder='Write a comment...'
              />
              <button className='Community-comment-btn' onClick={() => handleCommentSubmit(post._id)}>Comment</button>
              <button className='Community-delete-btn' onClick={() => handleDeletePost(post._id)}>Delete</button>
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
