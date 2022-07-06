import css from './HomeCards.module.css';

import { useEffect } from 'react';

import { useState } from 'react';
import { useAuthCtx } from '../../store/authContext';

import React from 'react';
import { baseUrlSkills, myFetchAuth } from '../../helper/utils';
import HomeCard from './HomeCard';
import { Link } from 'react-router-dom';

function HomeCardList() {
  const { token } = useAuthCtx();
  const [post, setPost] = useState([]);
  //   console.log('token', token);

  const getPosts = async () => {
    const fetchRes = await myFetchAuth(`${baseUrlSkills}`, token);
    // console.log('fetchRes ===', fetchRes);
    if (Array.isArray(fetchRes)) {
      setPost(fetchRes);
    }
  };

  useEffect(() => {
    if (token) getPosts();
  }, []);

  return (
    <div className={css.cardList}>
      <h1>Skills list:</h1>
      <div className={css.gridContainer}>
        {post.length > 0 ? (
          post.map((skObj) => <HomeCard key={skObj.id} {...skObj} />)
        ) : (
          <>
            <div>
              <h2>There are no available posts...</h2>
              <br />

              <h3 className={css.addText}>Want to add new post?</h3>
              <h3>
                Do it{' '}
                <Link className={css.link} to={'/add'}>
                  HERE
                </Link>
              </h3>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeCardList;
