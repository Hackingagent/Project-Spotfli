import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiChevronLeft, FiEdit2, FiTrash2, FiPlus, 
  FiSave, FiX, FiHeart, FiImage, FiUpload 
} from 'react-icons/fi';
import styles from './PropertyDetailPage.module.css';
import { getPropertySubcategory, getSingleProperty, updateProperty } from '../../../api/user/property/property';
import Notification from '../../notification/notification';

const PropertyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editing, setEditing] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [formData, setFormData] = useState({});
  const [newImages, setNewImages] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fieldDefinitions, setFieldDefinitions] = useState([]);
  const [activeEditField, setActiveEditField] = useState(null);
  const [subcategory, setSubcategory] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        console.log(id)
        const response = await getSingleProperty(id);
        setProperty(response.property);
        setFormData(response.property.data || {});
        // setIsFavorite(response.data.isFavorite);
        
        const subcategoryResponse = await getPropertySubcategory(response.property.subcategory);
        setSubcategory(subcategoryResponse.subcategory);
        setFieldDefinitions(subcategoryResponse.subcategory.fields || []);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  const handleImageChange = (index) => {
    setCurrentImageIndex(index);
  };

  const handleDeleteImage = async (imageId) => {
    try {
      await api.deleteImage(id, imageId);
      setProperty(prev => ({
        ...prev,
        files: prev.files.filter(file => file._id !== imageId)
      }));
      if (currentImageIndex >= property.files.length - 1) {
        setCurrentImageIndex(0);
      }
    } catch (err) {
      console.error('Error deleting image:', err);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewImages(files);
  };

  const handleUploadImages = async () => {
    try {
      const formData = new FormData();
      newImages.forEach(file => {
        formData.append('images', file);
      });

      const response = await api.uploadImages(id, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(percentCompleted);
        }
      });

      setProperty(prev => ({
        ...prev,
        files: [...prev.files, ...response.data]
      }));
      setNewImages([]);
      setUploadProgress(0);
    } catch (err) {
      console.error('Error uploading images:', err);
    }
  };

  const handleInputChange = (fieldKey, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: value
    }));
  };

  const handleArrayItemChange = (fieldKey, index, value) => {
    setFormData(prev => {
      const newArray = [...(prev[fieldKey] || [])];
      newArray[index] = value;
      return {
        ...prev,
        [fieldKey]: newArray
      };
    });
  };

  const addArrayItem = (fieldKey) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: [...(prev[fieldKey] || []), '']
    }));
  };

  const removeArrayItem = (fieldKey, index) => {
    setFormData(prev => ({
      ...prev,
      [fieldKey]: prev[fieldKey].filter((_, i) => i !== index)
    }));
  };

  const toggleFavorite = async () => {
    try {
      await api.toggleFavorite(id);
      setIsFavorite(prev => !prev);
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await updateProperty(id, formData);
      setProperty(prev => ({
        ...prev,
        data: response.property
      }));

      setMessage(response.message);
      setEditing(false);
      setActiveEditField(null);
    } catch (err) {
      console.error('Error updating property:', err);
    }
  };

  // const toggleEditField = (fieldKey) => {
  //   setActiveEditField(activeEditField === fieldKey ? null : fieldKey);
  // };

  const renderFieldInput = (field) => {
    const value = formData[field.key];
    
    if (activeEditField === field.key || editing) {
      switch (field.type) {
        case 'text':
          return (
            <input
              type='text' 
              value={value || ''}
              onChange={(e)=> handleInputChange(field.key, e.target.value)}
              className={styles.editInput}
            />
          )
        case 'textarea':
          return (
            <textarea
              value={value || ''}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className={styles.editTextarea}
              rows={3}
            />
          );
        case 'number':
          return (
            <input
              type="number"
              value={value || 0}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className={styles.editInput}
            />
          );
        case 'dropdown':
        case 'radio':
          return (
            <select
              value={value || ''}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className={styles.editInput}
            >
              {field.options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
              ))}
            </select>
          );
        case 'checkbox':
          return (
            <input
              type="checkbox"
              checked={!!value}
              onChange={(e) => handleInputChange(field.key, e.target.checked)}
              className={styles.editCheckbox}
            />
          );
        case 'date':
          return (
            <input
              type="date"
              value={value || ''}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className={styles.editInput}
            />
          );
        case 'array':
          return (
            <div className={styles.arrayField}>
              {(value || []).map((item, index) => (
                <div key={index} className={styles.arrayItem}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleArrayItemChange(field.key, index, e.target.value)}
                    className={styles.editInput}
                  />
                  <button
                    className={styles.deleteArrayItem}
                    onClick={() => removeArrayItem(field.key, index)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
              <button
                className={styles.addArrayItem}
                onClick={() => addArrayItem(field.key)}
              >
                <FiPlus /> Add {field.label}
              </button>
            </div>
          );
        default:
          return <input
            type="text"
            value={value || ''}
            onChange={(e) => handleInputChange(field.key, e.target.value)}
            className={styles.editInput}
          />;
      }
    }

    // Display mode
    switch (field.type) {
      case 'checkbox':
        return <span>{value ? 'Yes' : 'No'}</span>;
      case 'date':
        return <span>{value ? new Date(value).toLocaleDateString() : 'Not specified'}</span>;
      case 'array':
        return (
          <ul className={styles.arrayDisplay}>
            {(value || []).map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        );
      default:
        return <span>{value?.toString() || 'Not specified'}</span>;
    }
  };

  if (loading) return <div className={styles.loading}>Loading property...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (!property) return <div className={styles.error}>Property not found</div>;

  const groupedFields = fieldDefinitions.reduce((groups, field) => {
    const groupName = field.group || 'Details';
    if (!groups[groupName]) {
      groups[groupName] = [];
    }
    groups[groupName].push(field);
    return groups;
  }, {});

  return (
    <>

      <Notification 
        message={message}
        noMessage={() => setMessage('')}
        type='success'
      />

      
      <div className={styles.container}>
        <button className={styles.backButton} onClick={() => navigate(-1)}>
          <FiChevronLeft /> Back to Properties
        </button>

        <div className={styles.header}>
          <h1>{property.data?.title || 'Untitled Property'}</h1>
          <div className={styles.actionButtons}>
            <button 
              className={`${styles.iconButton} ${isFavorite ? styles.favorite : ''}`}
              onClick={toggleFavorite}
            >
              <FiHeart />
            </button>
            <button 
              className={editing ? styles.cancelButton : styles.editButton}
              onClick={() => {
                setEditing(!editing);
                setActiveEditField(null);
              }}
            >
              {editing ? <><FiX /> Cancel</> : <><FiEdit2 /> Edit</>}
            </button>
            {editing && (
              <button className={styles.saveButton} onClick={handleSubmit}>
                <FiSave /> Save Changes
              </button>
            )}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.imageSection}>
            {property.files.length > 0 ? (
              <>
                <div className={styles.mainImageContainer}>
                  <img
                    src={`http://localhost:5000${property.files[currentImageIndex].url}`}
                    alt={`Property ${currentImageIndex + 1}`}
                    className={styles.mainImage}
                    onError={(e) => {
                      e.target.src = '/placeholder-property.jpg';
                    }}
                  />
                  {editing && (
                    <button 
                      className={styles.deleteImageButton}
                      onClick={() => handleDeleteImage(property.files[currentImageIndex]._id)}
                    >
                      <FiTrash2 /> Delete
                    </button>
                  )}
                </div>

                {property.files.length > 1 && (
                  <div className={styles.thumbnailContainer}>
                    {property.files.map((file, index) => (
                      <div key={file._id} className={styles.thumbnailWrapper}>
                        <img
                          src={`http://localhost:5000${file.url}`}
                          alt={`Thumbnail ${index + 1}`}
                          className={`${styles.thumbnail} ${index === currentImageIndex ? styles.active : ''}`}
                          onClick={() => handleImageChange(index)}
                        />
                        {editing && (
                          <button 
                            className={styles.deleteThumbnailButton}
                            onClick={() => handleDeleteImage(file._id)}
                          >
                            <FiTrash2 size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <div className={styles.noImages}>
                <FiImage size={48} />
                <p>No images available</p>
              </div>
            )}

            {editing && (
              <div className={styles.uploadSection}>
                <label className={styles.uploadButton}>
                  <FiUpload /> Upload Images
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                  />
                </label>
                {newImages.length > 0 && (
                  <>
                    <div className={styles.uploadInfo}>
                      <span>{newImages.length} image{newImages.length !== 1 ? 's' : ''} selected</span>
                      <button 
                        className={styles.uploadConfirmButton}
                        onClick={handleUploadImages}
                      >
                        Confirm Upload
                      </button>
                    </div>
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className={styles.progressBar}>
                        <div 
                          className={styles.progressFill} 
                          style={{ width: `${uploadProgress}%` }}
                        />
                        <span>{uploadProgress}%</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          <div className={styles.detailsSection}>
            {Object.entries(groupedFields).map(([groupName, fields]) => (
              <div key={groupName} className={styles.section}>
                <div className={styles.sectionHeader}>
                  <h2>{groupName}</h2>
                </div>
                
                <div className={styles.fieldGrid}>
                  {fields
                    .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
                    .map((field) => (
                      <div key={field.key} className={styles.fieldItem}>
                        <div className={styles.fieldHeader}>
                          <label className={styles.fieldLabel}>{field.label}</label>
                          {/* {!editing && (
                            <button
                              className={styles.fieldEditButton}
                              onClick={() => toggleEditField(field.key)}
                            >
                              <FiEdit2 size={14} />
                            </button>
                          )} */}
                        </div>
                        <div className={styles.fieldValue}>
                          {renderFieldInput(field)}
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyDetailPage;