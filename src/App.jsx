import React, { useState, useEffect } from 'react'
import './App.css'
import { fetchData } from './services/services';
import dividerSmall from './assets/images/pattern-divider-mobile.svg'
import dividerBig from './assets/images/pattern-divider-desktop.svg'
import iconDice from './assets/images/icon-dice.svg'
function App() {
  const [advice, setAdvice] = useState("");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const fetchDataAndSetAdvice = async () => {
    try {
      const data = await fetchData();
      setAdvice(data.slip);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchDataAndSetAdvice();
    const screenSize = () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    }

    screenSize()
    window.addEventListener("resize", screenSize);
    return () => {
      window.removeEventListener("resize", screenSize);
    }
  }, [])

  const handleClick = () => {
    fetchDataAndSetAdvice()
  }

  return (
    <>
      <div className='main-container'>
        <div className="card_advice-container">
          <div className="advice-container">
            <h1 className='title_advice-container'>Advice #{advice.id}</h1>
            <p className='phrase_advice-container'>"{advice.advice}"</p>
          </div>
          {
            isSmallScreen ? (
              <img className='image_divider-container' src={dividerSmall} alt="" />
            ) : (
              <img className='image_divider-container' src={dividerBig} alt="" />
            )
          }
          <button className='btn_advice-container' onClick={handleClick}>
            <img src={iconDice} alt="" />
          </button>
        </div>
      </div>
    </>
  )
}

export default App
