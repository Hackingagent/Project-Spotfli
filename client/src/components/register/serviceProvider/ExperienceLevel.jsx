import React from 'react'
import experience from '../../../assets/setup2.jpg'
import '../propertySeeker/register.css';
import Navbar from '../../navbar/VisitorNav';
import { Link } from 'react-router-dom';

const ExperienceLevel = () => {
  return (
    <div>
    <>
    <Navbar />
    <div className='setup register-container'>
      <div className="register">
        <div className="register-form-container">
            <div className="register-img">
                <img src={experience} alt="" />
            </div>
            <div className="register-form">
                <h2>Experience Level <i className="fa fa-engineer"></i></h2>
                <form>
                    <label htmlFor="businessDescription">Descibe Your Business:</label>
                    <textarea name="businessDescription" id="businessDescrioption" maxLength={500} placeholder='Maximum of 500 letters'></textarea>
                    <span>Experience Level</span>
                    <div className="gender">
                        <label htmlFor="beginner">Beginner:</label>
                        <input type="radio" name='experience'/>

                        <label htmlFor="midLevel">Mid Level:</label>
                        <input type="radio" name='experience'/>


                        <label htmlFor="Expert">Expert:</label>
                        <input type="radio" name='experience'/>
                    </div>
                    <Link className="register-btn" to="/login">Register <i className="fa fa-next"></i></Link>
                </form>
            </div>
        </div>
      </div>
    </div>
    </>
    </div>
  )
}

export default ExperienceLevel
