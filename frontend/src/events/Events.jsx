import React from 'react';
import './events.css';
import { Tilt } from 'react-tilt';


const eventData = [
  {
    imgUrl: 'https://www.gpj.com/wp-content/uploads/2019/05/Gaming_Industry_Page_body_image.13.png',
    title: 'Youth Gaming Competition',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, soluta quis quibusdam voluptatibus neque, odit laborum, laboriosam suscipit alias nulla id eaque repellat aspernatur perferendis at. Numquam reprehenderit ullam reiciendis.',
  },
  {
    imgUrl: 'https://ca-times.brightspotcdn.com/dims4/default/972feef/2147483647/strip/true/crop/899x506+0+0/resize/1200x675!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F88%2F16%2F80089735b885d596257ef8a831f2%2Fla-fi-tn-fanduel-alphadraft-20150924-001',
    title: 'Sneak Peek Events',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, soluta quis quibusdam voluptatibus neque, odit laborum, laboriosam suscipit alias nulla id eaque repellat aspernatur perferendis at. Numquam reprehenderit ullam reiciendis.',
  },
  {
    imgUrl: 'https://www.gaming.net/wp-content/uploads/2022/01/GettyImages-971150080-1000x600.jpg',
    title: 'Great Events with Great ivals',
    description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, soluta quis quibusdam voluptatibus neque, odit laborum, laboriosam suscipit alias nulla id eaque repellat aspernatur perferendis at. Numquam reprehenderit ullam reiciendis.',
  }
  // Add more data for other events here
];

const defaultOptions = {
  reverse: false,
  max: 35,
  perspective: 1000,
  scale: 1.1,
  speed: 1000,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(.03,.98,.52,.99)",
};

const Events = () => {
  return (
    <div>
      <h1 className='top-head'>The Latest Events from Guildmasters</h1>
      <hr className='horizontal-line' />

      <div className="events">
        {eventData.map((event, index) => (
          <div className="sections" key={index}>

            <Tilt options={defaultOptions}>
              <img src={event.imgUrl} className='rectangle' alt="" />
            </Tilt>
          
            <p className='small-head'>Events</p>
            <h1 className='small-h'><a href="">{event.title}</a></h1>
            <p className='small-p'>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Events;
  