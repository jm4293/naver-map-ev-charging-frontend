import React from 'react';
import axios from 'axios';

export const Home = () => {
  // const getApi = axios.get('localhost:4100/api').then((res) => {
  //   console.log(res);
  // });

  return (
    <>
      <button
        onClick={() => {
          axios.get('http://localhost:4100/api').then((res) => {
            console.log(res);
          });
        }}
      >
        fff
      </button>
      <div>Home</div>
    </>
  );
};
