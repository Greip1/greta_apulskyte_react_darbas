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
      <div className={css.card_container}>
        {post.length > 0 ? (
          post.map((skObj) => <HomeCard key={skObj.id} {...skObj} />)
        ) : (
          <>
            <h2>There are no posts...</h2>
            <h3>
              Add new post <Link to={'/add'}>HERE</Link>
            </h3>
          </>
        )}
      </div>
    </div>
  );
}

export default HomeCardList;
