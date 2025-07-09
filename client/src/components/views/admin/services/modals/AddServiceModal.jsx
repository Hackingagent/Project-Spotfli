import React, { useState } from 'react'
import '../service.css'
import { addService } from '../../../../../api/admin/services/service';
const AddServiceModal = ({close, refresh, message}) => {

  const [formData, setFormData] = useState({
    name: '',
    'fee': '',
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
      const response = await addService(formData);

      console.log('Service Added', response);
      message(response.message);
      setIsLoading(false);
      close();
      refresh();

      // if(response.service){
      //   console.log('Service Added Successfully');
      //   setIsLoading(false);
      //   close()
      // }
    } catch (error) {
      setError(error.message || 'Add Service failed');
    }

    setFormData({
      name: '',
      fee: '',
    });
  }


  return (
    <div className='s-dark-cover'>
    <div className='addService'>
        <form>
        <h2>Add New Service</h2>
        {error && <div className="error"> <i className='fa fa-times-circle' id='error-icon'></i>{error}</div>}
          <label for='name'>Service Name</label>
            <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
            ></input>

            <label for='fee'>Service Fee</label>
            <input
            type='number'
            name='fee'
            value={formData.fee}
            onChange={handleChange}
            required
            ></input>
            <button className='btn btn-primary' disabled={isLoading} type='submit' onClick={handleSubmit} >{isLoading ? ('Adding......'):('Add Service')}</button>
 
        </form>
    </div>
    </div>
  )
}

export default AddServiceModal