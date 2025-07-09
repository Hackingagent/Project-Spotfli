import React from 'react'

const EditService = ({data}) => {
  return (
    <div className='s-dark-cover'>
    <div className='addService'>
        <form>
        <h2>Edit Service <i className='fa fa-edit'></i></h2>
            <label for='serviceTitle'>Service Title</label>
            <input
            type='text'
            name='serviceTitle'
            value={data.name}
            required
            ></input>

            <label for='serviceFee'>ServiceFee</label>
            <input
            type='number'
            name='serviceFee'
            value={data.fee}
            required
            ></input>
            <input className='btn btn-primary' type='submit' value='Modify Service'></input>
 
        </form>
    </div>
    </div>
  )
}

export default EditService