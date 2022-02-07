import React from 'react';

import AuthenticatedPosts from './AuthenticatedPosts';
import UnauthenticatedPosts from './UnauthenticatedPost';

const Posts = () => {

  const userToken = localStorage.getItem("userToken");
  // console.log(userToken);
  return (
    <>
      {
        userToken ? <AuthenticatedPosts /> : <UnauthenticatedPosts />

      }
    </>
  )
}

export default Posts;