import React, { useState } from 'react'
import '../Category.css'
import { addCategory } from '../../../../../api/admin/category/category';

const AddCategoryModal = ({close, refresh, message}) => {

  const [formData, setFormData] = useState({
    name: '',
  })
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

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

    if(formData.name == ''){
      console.error('Please fill in all the fields');
      setError('Please fill all the fields')
      setIsLoading(false);
      return
    }

    try {
      const response = await addCategory(formData);

      console.log('Category Added', response);
      message(response.message);
      setIsLoading(false);
      close();
      refresh();
      
      

    } catch (error) {
      setError(error.message || 'Add Category failed');
    }

    setFormData({
      name: '',
    });
  }


  return (
    <div className='s-dark-cover'>
    <div className='addCategory'>
        <form>
        <h2>Add New Category</h2>
        {error && <div className="error"> <i className='fa fa-times-circle' id='error-icon'></i>{error}</div>}
          <label for='name'>Category Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          ></input>
          <button className='btn btn-primary' disabled={isLoading} type='submit' onClick={handleSubmit} >{isLoading ? ('Adding......'):('Add Category')}</button>
 
        </form>
    </div>
    </div>
  )
}

export default AddCategoryModal