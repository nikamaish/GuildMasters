import React from 'react';
import './intro.css';
import { init } from 'ityped';
import { useRef, useEffect } from 'react';

const Intro = () => {
  const textRef = useRef(); /// initialising the useRef hook and it is used to access the dom element
  // When you call useRef() without an argument, the reference's .current property will be initialized with undefined.

  useEffect(() => { 
    init(textRef.current, { // init is a function of ityped and it is passing current value of textRef to init function
      showCursor: true,
      backDelay: 1500,
      backSpeed: 60,
      strings: ["The Quest Begins Here","Your One Stop Destination", "For Gaming","Join us now"]
    });
  }, []);
  //This signifies that the code within the useEffect block will run only once, specifically after the initial render of the component. 
//By using textRef.current within the useEffect, it's accessing the DOM element referenced by textRef after it has been rendered.


  return (
    <div className="video-container">
      <video autoPlay muted loop>
        <source src="Gaming.mp4" type="video/mp4" />
      </video>
      <div className="content">
      <h1>GuildMasters</h1>
          <h3>
             <span ref={textRef} ></span> 
             {/* This would allow the textRef.current to reference that span element.  */}
           {/* if it is not working then cut strictmode from index.jsx file */}
          </h3>
      </div>
    </div>
  );
}

export default Intro;
