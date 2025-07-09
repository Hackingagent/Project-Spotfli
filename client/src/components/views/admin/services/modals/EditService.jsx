import React, { useState } from 'react'
import { updateService } from '../../../../../api/admin/services/service';


const EditService = ({data, refresh, message, close}) => {

  const [formData, setFormData] = useState({
    name: data.name,
    fee: data.fee,
  })
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if(formData.name == '' && formData.fee == ''){
      console.error('Please fill in all the fields');
      setError('Please fill all the fields')
      setIsLoading(false);
      return
    }

    try {
      const response = await updateService(data._id, formData);

      console.log('Service Updated', response);
      message(response.message);
      setIsLoading(false);
      close();
      refresh();

    } catch (error) {
      // setError(error || 'Add Service failed');
      console.error(error);
    }

  }

  
  return (
    <div className='s-dark-cover'>
    <div className='addService'>
        <form>
        <h2>Edit Service <i className='fa fa-edit'></i></h2>
        {error && <div className="error"> <i className='fa fa-times-circle' id='error-icon'></i>{error}</div>}

            <label for='name'>Service Title</label>
            <input 
              onChange={handleChange}
              type='text'
              name='name'
              value={formData.name}
              required
            ></input>

            <label for='fee'>ServiceFee</label>
            <input 
              onChange={handleChange}
              type='number'
              name='fee'
              value={formData.fee}
              required
            ></input>
            <button className='btn btn-primary' 
              disabled={isLoading} type='submit' 
              onClick={handleSubmit} 
            >
              {isLoading ? ('Updating......'):('Update Service')}
            </button>

 
        </form>
    </div>
    </div>
  )
}

export default EditService