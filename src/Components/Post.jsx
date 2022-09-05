import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { getPosts } from "../api";


export const Post = ({ peopleIdForPost, setPeopleIdForPost }) => {
  const [posts, setPosts] = useState([]);
  const [forViewBodyPost, setForViewBodyPost] = useState(0);
  const availableScreenWidth = window.screen.availWidth;

  useEffect(() => {
    getPosts().then(data => {
      setPosts([...data]);
    });
  }, [peopleIdForPost]);

  return (
    <div className='App__post'>
      <ul className='post'>
        {posts.filter(postID => postID.userId === peopleIdForPost)
          .map(post => (
            <div
              key={post.id}
              onClick={() => setForViewBodyPost(prev => prev === post.id ? 0 : post.id)}
            >
              <div
                className='post__title'
              >
                {post.title}
              </div>
              <div
                className={classNames('post__body',
                  post.id === forViewBodyPost ? '' : 'hide')}
              >
                {post.body}
              </div>
              <hr />
            </div>
          ))}
      </ul>

      {(availableScreenWidth <= 800) && 
        (
          <div 
            className='post__button'
            onClick={() => setPeopleIdForPost(0)}
          >
            Close
          </div>
        )
      }
    </div>
  );
};
