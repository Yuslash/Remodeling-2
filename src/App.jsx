import { useEffect, useState } from 'react';
import './index.css';

export default function App() {
  const [isScrollDown, setIsScrollDown] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0)

  useEffect(() => {
    let lastScrollY = window.scrollY; // Track the previous scroll position

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollAmount(currentScrollY)

      if (currentScrollY > lastScrollY) {
        setIsScrollDown(true); // Scrolling down
      } else {
        setIsScrollDown(false); // Scrolling up
      }

      lastScrollY = currentScrollY; // Update last scroll position
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup listener on unmounto
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>

       <div className='w-full h-screen flex m-10  justify-center '>
          <div className="expanding-layout w-[500px] h-[200px] bg-blue-400"
        style={{
          width: `${500 + scrollAmount * 1}px`,
          height: `${200 + scrollAmount * 1}px`
        }}
      ></div>

      </div>

      <div className="inner-content w-full h-[1200px] bg-black-400"></div>
    </>
  );
}

