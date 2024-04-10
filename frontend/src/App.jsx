import React from 'react';
import Header from './components/Header';
import ParticlesComponent from './components/ParticlesComponent';
import Conversor from './components/Conversor';
import Footer from './components/Footer';
import './css/App.css';
import './css/Particulas.css'



function App() {
  return (
    <div className='h-svh'>
      <ParticlesComponent id="particulas" />
      <Header />
      <Conversor />
      <Footer/>
    </div>
  );
}

export default App;