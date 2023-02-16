import React from 'react';
import NotesPic1 from '../images/notes5.jpg'
// import noteContext from '../context/notes/noteContext';

const About = () => {
 
 
  return (
    <>
      <div className='container m-auto'>
        <div className='row'>
          <div className='col-md-4'>
         
            <div className='container'>
              <div className='mb-3 '>
                <h1 className='heading mb-3 display-3'>Tell</h1>
                <h1 className='heading mb-3 display-3'>Your</h1>
                <h1 className='heading mb-3 display-3'>Story</h1>
                <h1 className='heading mb-3 display-3'>To</h1>
                <h1 className='heading mb-3 display-3'>Yourself</h1>
              </div>
            </div>
              <h5 className='para'>Join with me! Register, Login and Write. </h5>
          </div>

          <div className='col-md-8 picClass'>
          <img id='notesPic' src={NotesPic1} alt='Picture' />
          </div>
        </div>
      </div>
    </>
  );
}

export default About;

