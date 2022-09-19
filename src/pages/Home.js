import React from 'react';
import Header from '../components/Header';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const Home = () => {
  let getUserInfo = Cookies.get('user');
  let user = getUserInfo && JSON.parse(getUserInfo);

  if (!user) {
    return <Navigate to="/" replace />
  }

  return (
    <>
        <Header />
        <h1>{}</h1>
    </>
  )
};

export default Home;