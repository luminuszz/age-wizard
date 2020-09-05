import { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="box">
            <div className="title">Mago da idade</div>
            <div className="subtitle">
              Jogue uma idade aqui que o mago irá acertar
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
