import React from 'react'
import service from '../../../assets/service0.jpg'
import '../propertySeeker/register.css';
import Navbar from '../../navbar/VisitorNav';
import { Link } from 'react-router-dom';
const AddServiceInfo = () => {
  return (
    <>
    <Navbar />
    <div className='register-container'>
      <div className="register">
        <div className="register-form-container">
            <div className="register-img">
                <img src={service} alt="" />
            </div>
            <div className="register-form">
                <h2>Service Information <i className="fa-solid fa-tools"></i></h2>
                <form>
                    <label htmlFor="business-name">Business/Company Name:</label>
                    <input type="text" placeholder='Chris Glass Works'/>

                    <label htmlFor="business-type">Domain:</label>
                    <select name="businessType" id="businessType">
                      <option value=""></option>
                      <option value="plumber">Plumber</option>
                      <option value="electrician">Electrician</option>
                      <option value="carpenter">Carpenter</option>
                      <option value="cleaner">Cleaner</option>
                      <option value="cook">Cook/Chef</option>
                      <option value="barbar">Barber</option>
                      <option value="hairDresser">Hair Dresser</option>
                      <option value="nails">Nails</option>
                      <option value="massage">Massage</option>
                      <option value="mechanic">Mechanic</option>
                    </select>

                    <label htmlFor="username">City/Town:</label>
                    <select name="city" id="city">
                      <option value=""></option>
                      <option value="bamenda">Bamenda</option>
                      <option value="buea">Buea</option>
                      <option value="limbe">Limbe</option>
                      <option value="bafoussam">Bafoussam</option>
                      <option value="yaounde">Yaounde</option>
                      <option value="douala">Douala</option>
                    </select>


                    <label htmlFor="location">Preciese Location/Street:</label>
                    <input type="text" placeholder='Mile 4 Nkwen'/>

                    <Link className="register-btn" to="/experienceLevel">Next <i className="fa fa-arrow-right"></i></Link>
                </form>
            </div>
        </div>   
      </div>
    </div>
    </>
  )
}

export default AddServiceInfo
