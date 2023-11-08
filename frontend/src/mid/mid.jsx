import React from 'react';
import './mid.css';

const Mid = () => {
  const sections = [
    {
      title: 'Learn Gaming',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat reprehenderit incidunt optio? Dolore atque sequi quaerat ut voluptatum! Zebra and tiger',
      buttonText: 'Learn More',
    },
    {
      title: 'Join Community',
      content: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum ratione adipisci accusantium illo velit? Odit tempore quisquam sequi necessitatibus',
      buttonText: 'Join Now',
    },
    {
      title: 'Get Support',
      content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium corrupti laboriosam optio? Cupiditate laudantium corrupti culpa magni.',
      buttonText: 'Get Help',
    },
  ];

  return (
    <div className="mid" id="about" >
      <div className="page-mid">
        <h1>Explore Through Us</h1>
        <p>
        As Guildmasters, we're a leading gaming company with a diverse collection of video games across various genres and platforms. Our aim is to create engaging experiences for gamers. We're known for organizing large-scale gaming events, providing a platform for gamers, developers, and enthusiasts to connect, compete, and share their passion for gaming. From action-packed adventures to strategy games, our portfolio includes popular titles that cater to a wide range of gaming preferences. We're dedicated to innovation, community involvement, and setting high standards in game development. Our commitment lies in delivering exceptional gaming experiences and fostering a vibrant gaming culture, making us an influential presence in the gaming industry.
        </p>
      </div>

      <div className="page-low">
      {sections.map((section, index) => (
  <div className="section" key={index}>
    <div className="section-content">
      <h1>{section.title}</h1>
      <p>{section.content}</p>
      <button className="section-button">{section.buttonText}</button>
    </div>
  </div>
))}


      </div>
    </div>
  );
}

export default Mid;
