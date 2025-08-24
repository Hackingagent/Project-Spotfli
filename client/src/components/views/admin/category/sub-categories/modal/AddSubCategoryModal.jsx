import React, { useState } from 'react'
import { addSubCategory } from '../../../../../../api/admin/category/category';


const AddSubCategoryModal = ({close, refresh, message, id}) => {

  const [formData, setFormData] = useState({
    name: '',
    description: '',
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

    if(formData.name == ''){
      console.error('Please fill in all the fields');
      setError('Please fill all the fields')
      setIsLoading(false);
      return
    }

    try {
      const response = await addSubCategory(formData, id);

      console.log('Sub Category Added', response);
      message(response.message);
      setIsLoading(false);
      close();
      refresh();
      
      

    } catch (error) {
      setError(error.message || 'Add Sub Category failed');
    }

    setFormData({
      name: '',
      description: '',
    });
  }


  return (
    <div className='s-dark-cover'>
    <div className='addCategory'>
        
        <form>
        <h2>Add New Sub Category</h2>
        {error && <div className="error"> <i className='fa fa-times-circle' id='error-icon'></i>{error}</div>}
          <label for='name'>Sub Category Name</label>
          <input
            type='text'
            name='name'
            value={formData.name}
            onChange={handleChange}
            required
          ></input>

          <label for='name'>Description</label>
          <textarea
            name='description'
            onChange={handleChange}
            rows='4'             
          >{formData.description}</textarea>
          <button className='btn btn-primary' disabled={isLoading} type='submit' onClick={handleSubmit} >{isLoading ? ('Adding......'):('Add Sub Category')}</button>
 
        </form>
    </div>
    </div>
  )
}

export default AddSubCategoryModal