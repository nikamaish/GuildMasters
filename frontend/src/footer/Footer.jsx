import React, { useState } from 'react';
import './footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault(); // Prevents the form from submitting and refreshing the page
    setSubscribed(true); // Updates the state to show the subscription message
  };

  return (
    <div className="footer">
      <div className="centered-rectangle">
        <form onSubmit={handleSubscribe}>
          <h1>NewsLetter</h1>
          <p>Get updates on industry innovations and the latest free asset</p>

          {!subscribed && (
            // This code uses the logical NOT operator (!) with subscribed state. When subscribed is false, !subscribed evaluates to true. Therefore, the content inside the parentheses (()) will be rendered.
            // The content within the parentheses is wrapped in a React fragment (<>...</>). React fragments are a way to group multiple children without adding an extra node to the DOM. In this case, it encapsulates the email input and the subscribe button.
            // If the user is not subscribed (!subscribed is true), render the email input and subscribe button." This ensures that the email input and subscribe button are only displayed when the user hasn't subscribed yet

            <>
              <input type="email" className='textInput' placeholder="Enter your email here" required />
              <button type="submit" className='send'>Subscribe</button>
            </>
          )}

          {subscribed && <p className='subscribe-success'>You have subscribed successfully!</p>}

          <p className='p'>By submitting your information, you are agreeing to receive news, surveys, and special offers from GuildMasters.</p>
        </form>
      </div>

      <div className="footer-base" id='footer'>
        <FontAwesomeIcon icon={faInstagram} size='2x' className='fIcons' />
        <FontAwesomeIcon icon={faTwitter} size='2x' className='fIcons' />
        <FontAwesomeIcon icon={faFacebook} size='2x' className='fIcons' />
      </div>
    </div>
  );
};

export default Footer;
