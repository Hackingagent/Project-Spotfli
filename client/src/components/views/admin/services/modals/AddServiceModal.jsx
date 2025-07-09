import React from 'react'
import './service.css'
const AddServiceModal = () => {
  return (
    <div className='s-dark-cover'>
    <div className='addService'>
        <form>
        <h2>Add New Service</h2>
            <label for='serviceTitle'>Service Title</label>
            <input
            type='text'
            name='serviceTitle'
            required
            ></input>

            <label for='serviceFee'>ServiceFee</label>
            <input
            type='number'
            name='serviceFee'
            required
            ></input>
            <input className='btn btn-primary' type='submit' value='Add Service'></input>
 
        </form>
    </div>
    </div>
  )
}

export default AddServiceModal