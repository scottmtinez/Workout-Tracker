import React, { useState, useEffect } from 'react';
import './Community.css';

function Community() {
  // States
  const [leaderboard, setLeaderboard] = useState([]);
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [newComment, setNewComment] = useState({});

  // Retrieve user data from localStorage when the component mounts
  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log('User data retrieved from localStorage:', storedUser); // For Testing
    }
  }, []); // Runs only once when the component mounts

  const handlePostSubmit = () => {
    if (newPost.trim() === '') return;

    const post = {
      id: Date.now(),
      user: user.username,
      content: newPost,
      comments: [],
    };

    setPosts([...posts, post]);
    setNewPost('');
  };

  const handleCommentSubmit = (postId) => {
    if (newComment[postId]?.trim() === '') return;

    const updatedPosts = posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, { user: user.username, content: newComment[postId] }],
        };
      }
      return post;
    });

    setPosts(updatedPosts);
    setNewComment({ ...newComment, [postId]: '' });
  };

  return (
    <div className='Community-container'>
      <h2 className='Community-title'>The Community</h2>

      {user ? (
        <div className='Community-new-post'>
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder='Write a new post...'
          />
          <button onClick={handlePostSubmit}>Post</button>
        </div>
      ) : (
        <p>Please log in to create a post or comment.</p>
      )}

      <div className='Community-posts'>
        {posts.map((post) => (
          <div key={post.id} className='Community-post'>
            <p>
              <span>{post.content}</span><br />
              <span className='Community-post-user'>{post.user}</span>
            </p>

            <div className='Community-comments'>
              {post.comments.map((comment, index) => (
                <p key={index}><strong>{comment.user}</strong>: {comment.content}</p>
              ))}
            </div>
            {user && (
              <div className='Community-new-comment'>
                <textarea
                  value={newComment[post.id] || ''}
                  onChange={(e) => setNewComment({ ...newComment, [post.id]: e.target.value })}
                  placeholder='Write a comment...'
                />
                <button onClick={() => handleCommentSubmit(post.id)}>Comment</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;
