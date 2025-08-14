import React, { useState, useEffect, useCallback } from 'react';
import { FaCheckCircle, FaChevronRight, FaSpinner, FaTimes, FaEye, FaUpload } from 'react-icons/fa';
import { useDropzone } from 'react-dropzone';
import { addProperty, getCategories } from '../../../../api/user/property/property';
import styles from './add-property.module.css';
import Notification from '../../../notification/notification';

const AddProperty = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [formData, setFormData] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [files, setFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.categories);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const onDrop = useCallback(acceptedFiles => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setFiles(prev => [...prev, ...acceptedFiles]);
    setFilePreviews(prev => [...prev, ...newFiles]);
    
    // Clear any file errors when files are added
    if (formErrors.files) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors.files;
        return newErrors;
      });
    }
  }, [formErrors]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: true
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
    setCurrentStep(2);
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setCurrentStep(3);
  };

  const handleInputChange = (fieldKey, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }));
  
    // Clear error when user starts typing
    if (formErrors[fieldKey]) {
      setFormErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[fieldKey];
        return newErrors;
      });
    }
  };

  const handleArrayChange = (fieldKey, value, index) => {
    setFormData(prev => {
      const newArray = [...(prev[fieldKey] || [])];
      newArray[index] = value;
      return {
        ...prev,
        [fieldKey]: newArray
      };
    });
  };

  const handleArrayAdd = (fieldKey, initialValue = '') => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: [...(prev[fieldKey] || []), initialValue]
    }));
  };

  const handleArrayRemove = (fieldKey, index) => {
    setFormData(prev => {
      const newArray = [...(prev[fieldKey] || [])];
      newArray.splice(index, 1);
      return {
        ...prev,
        [fieldKey]: newArray
      };
    });
  };

  const removeFile = (index) => {
    const newFiles = [...files];
    const newPreviews = [...filePreviews];
    
    URL.revokeObjectURL(newPreviews[index].preview);
    
    newFiles.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setFiles(newFiles);
    setFilePreviews(newPreviews);
  };

  const validateField = (field, value) => {
    const errors = {};
    const { validation, isRequired, label, type } = field;
  
    // Required field validation
    if (isRequired && type != 'file' && currentStep == 3) {
      if (type === 'array') {
        if (!value || value.length === 0) {
          errors[field.key] = `${label} is required`;
        } else if (validation?.arrayItemRequired) {
          value.forEach((item, index) => {
            if (item === undefined || item === null || (typeof item === 'string' && item.trim() === '')) {
              errors[`${field.key}_${index}`] = `Item ${index + 1} is required`;
            }
          });
        }
      } else if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errors[field.key] = `${label} is required`;
      }
    }
    // Required field validation
    if (isRequired && currentStep==4 && type == 'file') {
      if (type === 'array') {
        if (!value || value.length === 0) {
          errors[field.key] = `${label} is required`;
        } else if (validation?.arrayItemRequired) {
          value.forEach((item, index) => {
            if (item === undefined || item === null || (typeof item === 'string' && item.trim() === '')) {
              errors[`${field.key}_${index}`] = `Item ${index + 1} is required`;
            }
          });
        }
      } else if (
        value === undefined ||
        value === null ||
        (typeof value === 'string' && value.trim() === '') ||
        (Array.isArray(value) && value.length === 0)
      ) {
        errors[field.key] = `${label} is required`;
      }
    }
  
    // Type-specific validation rules
    if (validation && value && value.toString().trim() !== '') {
      const stringValue = value.toString();
      const numericValue = Number(value);
  
      // Text/textarea validations
      if (type === 'text' || type === 'textarea') {
        if (validation.minLength && stringValue.length < validation.minLength) {
          errors[field.key] = `Minimum length is ${validation.minLength}`;
        }
        if (validation.maxLength && stringValue.length > validation.maxLength) {
          errors[field.key] = `Maximum length is ${validation.maxLength}`;
        }
        if (validation.pattern && !new RegExp(validation.pattern).test(stringValue)) {
          errors[field.key] = validation.patternMessage || 'Invalid format';
        }
      }
  
      // Number validations
      if (type === 'number' && !isNaN(numericValue)) {
        if (validation.min !== undefined && numericValue < validation.min) {
          errors[field.key] = `Minimum value is ${validation.min}`;
        }
        if (validation.max !== undefined && numericValue > validation.max) {
          errors[field.key] = `Maximum value is ${validation.max}`;
        }
      }
  
      // Date validations
      if (type === 'date' && stringValue) {
        const dateValue = new Date(stringValue);
        if (validation.minDate && dateValue < new Date(validation.minDate)) {
          errors[field.key] = `Date must be after ${new Date(validation.minDate).toLocaleDateString()}`;
        }
        if (validation.maxDate && dateValue > new Date(validation.maxDate)) {
          errors[field.key] = `Date must be before ${new Date(validation.maxDate).toLocaleDateString()}`;
        }
      }
  
      // Email validation
      if (type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stringValue)) {
        errors[field.key] = 'Please enter a valid email address';
      }
    }
  
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = {};
    selectedSubcategory.fields.forEach(field => {
      const fieldErrors = validateField(field, formData[field.key]);
      Object.assign(errors, fieldErrors);
    });

    if (Object.keys(errors).length > 0) {
      console.table(errors)
      setFormErrors(errors);
      return;
    }
    
    setCurrentStep(4);
  };

  const handleFileUploadSubmit = () => {
    // Only validate files when submitting from step 4
    if (currentStep === 4) {
      const errors = {};
      
      // Check if files are required (you can add this as a property to your subcategory)
      if (selectedSubcategory.requiresFiles && files.length === 0) {
        errors.files = 'Please upload at least one file';
      }
      
      if (Object.keys(errors).length > 0) {
        setFormErrors(errors);
        return;
      }
    }
    
    setCurrentStep(5);
  };

  const handleFinalSubmit = async () => {
    try {
      setSubmissionStatus('submitting');
      
      const formDataToSend = new FormData();
      formDataToSend.append('category', selectedCategory._id);
      formDataToSend.append('subcategory', selectedSubcategory._id);
      
      // Append all form data
      Object.entries(formData).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((item, index) => {
            formDataToSend.append(`${key}[${index}]`, item);
          });
        } else {
          formDataToSend.append(key, value);
        }
      });
      
      // Append all files
      files.forEach(file => {
        formDataToSend.append('files', file);
      });

      const response = await addProperty(formDataToSend);
      if(response.success){
        setMessage(response.message);
        setSubmissionStatus('success');
        setCurrentStep(6);
      }else{
        setSubmissionStatus('error')
      }
      
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
    }
  };

  
  const renderFieldInput = (field) => {
    const { type, key, label, placeholder, options, isRequired } = field;
    const value = formData[key] || '';
    const error = formErrors[key];

    switch (type) {
      case 'text':
      case 'email':
      case 'number':
      case 'date':
        return (
          <div className={`${styles.formGroup} ${error ? styles.hasError : ''}`}>
            <label>
              {label}
              {isRequired && <span className={styles.required}>*</span>}
            </label>
            <input
              type={type}
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              placeholder={placeholder}
              className={styles.formControl}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>
        );
      case 'textarea':
        return (
          <div className={`${styles.formGroup} ${error ? styles.hasError : ''}`}>
            <label>
              {label}
              {isRequired && <span className={styles.required}>*</span>}
            </label>
            <textarea
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              onBlur={() => {
                  if (isRequired && (!value || value.trim() === '')) {
                    setFormErrors(prev => ({
                      ...prev,
                      [key]: `${label} is required`
                    }));
                  }
              }}
              placeholder={placeholder}
              className={styles.formControl}
              rows={4}
            />
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>
        );
      case 'dropdown':
        return (
          <div className={`${styles.formGroup} ${error ? styles.hasError : ''}`}>
            <label>
              {label}
              {isRequired && <span className={styles.required}>*</span>}
            </label>
            <select
              value={value}
              onChange={(e) => handleInputChange(key, e.target.value)}
              className={styles.formControl}
            >
              <option value="">Select an option</option>
              {options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>
        );
      case 'checkbox':
        return (
          <div className={`${styles.formGroup} ${error ? styles.hasError : ''}`}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={!!value}
                onChange={(e) => handleInputChange(key, e.target.checked)}
                className={styles.formCheckbox}
              />
              {label}
              {isRequired && <span className={styles.required}>*</span>}
            </label>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>
        );
      case 'radio':
        return (
          <div className={`${styles.formGroup} ${error ? styles.hasError : ''}`}>
            <label>{label}{isRequired && <span className={styles.required}>*</span>}</label>
            <div className={styles.radioGroup}>
              {options.map((option, i) => (
                <label key={i} className={styles.radioOption}>
                  <input
                    type="radio"
                    name={key}
                    value={option}
                    checked={value === option}
                    onChange={() => handleInputChange(key, option)}
                  />
                  {option}
                </label>
              ))}
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>
        );
      case 'array':
        return (
          <div className={`${styles.formGroup} ${error ? styles.hasError : ''}`}>
            <label>
              {label}
              {isRequired && <span className={styles.required}>*</span>}
            </label>
            <div className={styles.arrayContainer}>
              {(formData[key] || []).map((item, index) => (
                <div key={index} className={styles.arrayItem}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayChange(key, e.target.value, index)}
                    placeholder={placeholder}
                    className={styles.formControl}
                  />
                  <button
                    type="button"
                    className={styles.removeArrayItem}
                    onClick={() => handleArrayRemove(key, index)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
              <button
                type="button"
                className={styles.addArrayItem}
                onClick={() => handleArrayAdd(key, '')}
              >
                Add {label}
              </button>
            </div>
            {error && <div className={styles.errorMessage}>{error}</div>}
          </div>
        );
      default:
        return null;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.stepContent}>
            <h2>Select a Category</h2>
            <div className={styles.categoryGrid}>
              {categories.map(category => (
                <div 
                  key={category._id} 
                  className={styles.categoryCard}
                  onClick={() => handleCategorySelect(category)}
                >
                  <div className={styles.categoryIcon}>
                    <FaCheckCircle />
                  </div>
                  <h3>{category.name}</h3>
                  <p>{category.subcategories.length} subcategories available</p>
                  <div className={styles.selectArrow}>
                    <FaChevronRight />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.stepContent}>
            <h2>Select a Subcategory</h2>
            <div className={styles.subcategoryList}>
              {selectedCategory.subcategories.map(subcategory => (
                <div 
                  key={subcategory._id} 
                  className={styles.subcategoryCard}
                  onClick={() => handleSubcategorySelect(subcategory)}
                >
                  <h3>{subcategory.name}</h3>
                  <p>{subcategory.description}</p>
                  <div className={styles.fieldCount}>
                    {subcategory.fields.length} fields
                  </div>
                  <div className={styles.selectArrow}>
                    <FaChevronRight />
                  </div>
                </div>
              ))}
            </div>
            <button 
              className={styles.backButton}
              onClick={() => setCurrentStep(1)}
            >
              Back to Categories
            </button>
          </div>
        );
      case 3:
        return (
          <div className={styles.stepContent}>
            <h2>Complete the Form</h2>
            <form onSubmit={handleSubmit}>
              {selectedSubcategory.fields.map(field => (
                <div key={field.key} className={styles.fieldContainer}>
                  {renderFieldInput(field)}
                </div>
              ))}
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.secondaryButton}
                  onClick={() => setCurrentStep(2)}
                >
                  Back
                </button>
                <button 
                  type="submit" 
                  className={styles.primaryButton}
                >
                  Continue to File Upload
                </button>
              </div>
            </form>
          </div>
      );
           
      case 4:
        return (
          <div className={styles.stepContent}>
            <h2>Upload Files</h2>
            <div 
              {...getRootProps()} 
              className={`${styles.dropzone} ${isDragActive ? styles.active : ''} ${formErrors.files ? styles.hasError : ''}`}
            >
              <input {...getInputProps()} />
              <div className={styles.dropzoneContent}>
                <FaUpload className={styles.uploadIcon} />
                {isDragActive ? (
                  <p>Drop the files here...</p>
                ) : (
                  <>
                    <p>Drag & drop files here, or click to select files</p>
                    <p className={styles.supportedFormats}>Supported formats: JPG, PNG, GIF</p>
                  </>
                )}
              </div>
            </div>
            
            {formErrors.files && (
              <div className={styles.errorMessage}>{formErrors.files}</div>
            )}
            
            {filePreviews.length > 0 && (
              <div className={styles.uploadedFiles}>
                <h3>Uploaded Files ({filePreviews.length})</h3>
                <div className={styles.filePreviews}>
                  {filePreviews.map((file, index) => (
                    <div key={index} className={styles.filePreview}>
                      <img src={file.preview} alt={`Preview ${index + 1}`} />
                      <div className={styles.fileInfo}>
                        <span>{file.file.name}</span>
                        <span>{(file.file.size / 1024).toFixed(2)} KB</span>
                      </div>
                      <button
                        type="button"
                        className={styles.removeFile}
                        onClick={() => removeFile(index)}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className={styles.formActions}>
              <button 
                type="button" 
                className={styles.secondaryButton}
                onClick={() => setCurrentStep(3)}
              >
                Back
              </button>
              <button 
                type="button" 
                className={styles.primaryButton}
                onClick={handleFileUploadSubmit}
              >
                Continue to Preview
              </button>
            </div>
          </div>
        );
        case 5:
          return (
            <div className={styles.stepContent}>
              <h2>Preview Your Submission</h2>
              
              <div className={styles.previewSection}>
                <h3>Form Data</h3>
                <div className={styles.previewData}>
                  {selectedSubcategory.fields.map(field => (
                    <div key={field.key} className={styles.previewField}>
                      <strong>{field.label}:</strong>
                      <span>
                        {Array.isArray(formData[field.key]) 
                          ? formData[field.key].join(', ')
                          : formData[field.key]?.toString() || 'Not provided'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.previewSection}>
                <h3>Uploaded Files</h3>
                <div className={styles.previewFiles}>
                  {filePreviews.map((file, index) => (
                    <div key={index} className={styles.previewFile}>
                      <img src={file.preview} alt={`Preview ${index + 1}`} />
                      <div className={styles.fileDetails}>
                        <span>{file.file.name}</span>
                        <span>{(file.file.size / 1024).toFixed(2)} KB</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className={styles.formActions}>
                <button 
                  type="button" 
                  className={styles.secondaryButton}
                  onClick={() => setCurrentStep(4)}
                >
                  Back
                </button>
                <button 
                  type="button" 
                  className={styles.primaryButton}
                  onClick={handleFinalSubmit}
                  disabled={submissionStatus === 'submitting'}
                >
                  {submissionStatus === 'submitting' ? (
                    <>
                      <FaSpinner className={styles.spinner} />
                      Submitting...
                    </>
                  ) : 'Submit'}
                </button>
              </div>
            </div>
          );
        case 6:
          return (
            <div className={`${styles.stepContent} ${styles.successScreen}`}>
              <div className={styles.successIcon}>
                <FaCheckCircle />
              </div>
              <h2>Submission Successful!</h2>
              <p>Thank you for your submission. We'll review it shortly.</p>
              <button 
                className={styles.primaryButton}
                onClick={() => {
                  setCurrentStep(1);
                  setSelectedCategory(null);
                  setSelectedSubcategory(null);
                  setFormData({});
                  setFormErrors({});
                  setFiles([]);
                  setFilePreviews([]);
                  setSubmissionStatus(null);
                }}
              >
                Start New Submission
              </button>
            </div>
          );
        default:
          return null;
      }
    };
  
    if (loading) {
      return (
        <div className={styles.loadingScreen}>
          <FaSpinner className={`${styles.spinner} ${styles.large}`} />
          <p>Loading form categories...</p>
        </div>
      );
    }

  return (
   <>

      {message && (
        <Notification
          message={message}
          noMessage={() => setMessage('')}
          type= 'success'
        />
      )}

      <div className={styles.formBuilderContainer}>
        <div className={styles.stepperHeader}>
          <div className={`${styles.stepperStep} ${currentStep >= 1 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>1</div>
            <div className={styles.stepLabel}>Category</div>
          </div>
          <div className={`${styles.stepperConnector} ${currentStep >= 2 ? styles.active : ''}`}></div>
          <div className={`${styles.stepperStep} ${currentStep >= 2 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>2</div>
            <div className={styles.stepLabel}>Subcategory</div>
          </div>
          <div className={`${styles.stepperConnector} ${currentStep >= 3 ? styles.active : ''}`}></div>
          <div className={`${styles.stepperStep} ${currentStep >= 3 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>3</div>
            <div className={styles.stepLabel}>Details</div>
          </div>
          <div className={`${styles.stepperConnector} ${currentStep >= 4 ? styles.active : ''}`}></div>
          <div className={`${styles.stepperStep} ${currentStep >= 4 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>4</div>
            <div className={styles.stepLabel}>Files</div>
          </div>
          <div className={`${styles.stepperConnector} ${currentStep >= 5 ? styles.active : ''}`}></div>
          <div className={`${styles.stepperStep} ${currentStep >= 5 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>5</div>
            <div className={styles.stepLabel}>Preview</div>
          </div>
          <div className={`${styles.stepperConnector} ${currentStep >= 6 ? styles.active : ''}`}></div>
          <div className={`${styles.stepperStep} ${currentStep >= 6 ? styles.active : ''}`}>
            <div className={styles.stepNumber}>6</div>
            <div className={styles.stepLabel}>Complete</div>
          </div>
        </div>

        {renderStepContent()}
      </div>
   </>
  );
};

export default AddProperty;