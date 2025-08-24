import React, { useState, useCallback, useRef, useEffect } from 'react';
import styles from './PropertyRoomModal.module.css';

const ViewPropertyRoomModal = ({ room, onClose, onSubmit }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [deletedFiles, setDeletedFiles] = useState([]); 
  const [formData, setFormData] = useState({
    roomType: '',
    livingRoom: 0,
    bedRoom: 0,
    toilet: 0,
    kitchen: 0,
    price: 0,
    description: '',
    quantityAvailable: 1,
    amenities: [],
    newAmenity: '',
    files: []
  });

  const [fileUploads, setFileUploads] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (room) {

      const initialAmenities = Array.isArray(room.amenities) 
      ? room.amenities 
      : []; // Fallback to empty array

      setFormData({
        roomType: room.roomType || '',
        livingRoom: room.livingRoom || 0,
        bedRoom: room.bedRoom || 0,
        toilet: room.toilet || 0,
        kitchen: room.kitchen || 0,
        price: room.price || 0,
        description: room.description || '',
        quantityAvailable: room.quantityAvailable || 1,
        amenities: initialAmenities,
        newAmenity: '',
        files: []
      });
      setExistingImages(room.files || []);
    }
  }, [room]);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value === '' ? '' : Number(value)
    }));
  };

  
  const handleAmenityAdd = () => {
    const trimmedAmenity = formData.newAmenity.trim();
    if (trimmedAmenity && !formData.amenities.includes(trimmedAmenity)) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, trimmedAmenity],
        newAmenity: ''
      }));
    }
  };
  
  const handleAmenityRemove = (amenityToRemove) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(amenity => amenity !== amenityToRemove)
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    processFiles(files);
  };

  const processFiles = (files) => {
    const validFiles = files.filter(file => file.type.startsWith('image/'));
    setFileUploads(prev => [...prev, ...validFiles]);
  };

  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  }, []);

  const handleDropzoneClick = () => {
    fileInputRef.current.click();
  };

  const removeFile = (index) => {
    setFileUploads(prev => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index, fileId) => {
    setDeletedFiles(prev => [...prev, fileId]); // Track deleted files
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();

      // Append deleted files if any
      if (deletedFiles.length > 0) {
        formDataToSend.append('deletedFiles', JSON.stringify(deletedFiles));
      }    

      // formDataToSend.append('amenities', JSON.stringify(formData.amenities));
      formData.amenities.forEach(amenity => {
        formDataToSend.append('amenities', amenity);
      })


      
       // Append other fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'files' && key !== 'amenities') { // Skip files and amenities
          formDataToSend.append(key, value);
        }
      });

      
      
      fileUploads.forEach(file => {
        formDataToSend.append('files', file);
      });
      
      await onSubmit(formDataToSend);
      setIsEditMode(false);
      setDeletedFiles([]); // Reset after successful submission

      onclose();
      
    } catch (error) {
      console.log(error);
    }
  };

  const renderViewMode = () => (
    <div className={styles.viewContent}>
      <div className={styles.roomFeatures}>
        <h3>Room Features</h3>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <span className={styles.featureLabel}>Living Rooms:</span>
            <span className={styles.featureValue}>{formData.livingRoom}</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureLabel}>Bed Rooms:</span>
            <span className={styles.featureValue}>{formData.bedRoom}</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureLabel}>Toilets:</span>
            <span className={styles.featureValue}>{formData.toilet}</span>
          </div>
          <div className={styles.featureItem}>
            <span className={styles.featureLabel}>Kitchens:</span>
            <span className={styles.featureValue}>{formData.kitchen}</span>
          </div>
        </div>
      </div>

      <div className={styles.detailItem}>
        <span className={styles.detailLabel}>Price:</span>
        <span className={styles.detailValue}>{formData.price} XAF</span>
      </div>

      <div className={styles.detailItem}>
        <span className={styles.detailLabel}>Quantity Available:</span>
        <span className={styles.detailValue}>{formData.quantityAvailable}</span>
      </div>

      <div className={styles.detailItem}>
        <span className={styles.detailLabel}>Description:</span>
        <p className={styles.detailValue}>{formData.description}</p>
      </div>

      <div className={styles.detailItem}>
        <span className={styles.detailLabel}>Amenities:</span>
        <div className={styles.amenitiesList}>
          {formData.amenities.length > 0 ? (
            formData.amenities.map((amenity, index) => (
              <span key={index} className={styles.amenityPill}>
                {amenity}
              </span>
            ))
          ) : (
            <span className={styles.noAmenities}>No amenities listed</span>
          )}
        </div>
      </div>

      <div className={styles.detailItem}>
        <span className={styles.detailLabel}>Images:</span>
        <div className={styles.imageGallery}>
          {existingImages.length > 0 ? (
            existingImages.map((image, index) => (
              <div key={index} className={styles.galleryImage}>
                <img src={`${import.meta.env.VITE_FILE_API_URL}${image.url}`} alt={`Room ${index}`} />
              </div>
            ))
          ) : (
            <span className={styles.noImages}>No images available</span>
          )}
        </div>
      </div>
    </div>
  );

  const renderEditMode = () => (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.roomFeatures}>
        <h3>Room Features</h3>
        <div className={styles.featureGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="livingRoom">Living Rooms</label>
            <div className={styles.numberInputContainer}>
              <button 
                type="button"
                className={styles.numberControl}
                onClick={() => handleNumberChange({
                  target: {
                    name: 'livingRoom',
                    value: Math.max(0, formData.livingRoom - 1)
                  }
                })}
                disabled={formData.livingRoom <= 0}
              >
                -
              </button>
              <input
                type="text"
                id="livingRoom"
                name="livingRoom"
                value={formData.livingRoom}
                readOnly
                className={styles.numberInput}
              />
              <button 
                type="button"
                className={styles.numberControl}
                onClick={() => handleNumberChange({
                  target: {
                    name: 'livingRoom',
                    value: formData.livingRoom + 1
                  }
                })}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="bedRoom">Bed Rooms</label>
            <div className={styles.numberInputContainer}>
              <button 
                type="button"
                className={styles.numberControl}
                onClick={() => handleNumberChange({
                  target: {
                    name: 'bedRoom',
                    value: Math.max(0, formData.bedRoom - 1)
                  }
                })}
                disabled={formData.bedRoom <= 0}
              >
                -
              </button>
              <input
                type="text"
                id="bedRoom"
                name="bedRoom"
                value={formData.bedRoom}
                readOnly
                className={styles.numberInput}
              />
              <button 
                type="button"
                className={styles.numberControl}
                onClick={() => handleNumberChange({
                  target: {
                    name: 'bedRoom',
                    value: formData.bedRoom + 1
                  }
                })}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="toilet">Toilet</label>
            <div className={styles.numberInputContainer}>
              <button 
                type="button"
                className={styles.numberControl}
                onClick={() => handleNumberChange({
                  target: {
                    name: 'toilet',
                    value: Math.max(0, formData.toilet - 1)
                  }
                })}
                disabled={formData.toilet <= 0}
              >
                -
              </button>
              <input
                type="text"
                id="toilet"
                name="toilet"
                value={formData.toilet}
                readOnly
                className={styles.numberInput}
              />
              <button 
                type="button"
                className={styles.numberControl}
                onClick={() => handleNumberChange({
                  target: {
                    name: 'toilet',
                    value: formData.toilet + 1
                  }
                })}
              >
                +
              </button>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="kitchen">Kitchen</label>
            <div className={styles.numberInputContainer}>
              <button 
                type="button"
                className={styles.numberControl}
                onClick={() => handleNumberChange({
                  target: {
                    name: 'kitchen',
                    value: Math.max(0, formData.kitchen - 1)
                  }
                })}
                disabled={formData.kitchen <= 0}
              >
                -
              </button>
              <input
                type="text"
                id="kitchen"
                name="kitchen"
                value={formData.kitchen}
                readOnly
                className={styles.numberInput}
              />
              <button 
                type="button"
                className={styles.numberControl}
                onClick={() => handleNumberChange({
                  target: {
                    name: 'kitchen',
                    value: formData.kitchen + 1
                  }
                })}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="price">Price (XAF)</label>
        <input
          type="number"
          id="price"
          name="price"
          min="0"
          step="0.01"
          value={formData.price}
          onChange={handleNumberChange}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="quantityAvailable">Quantity Available</label>
        <div className={styles.numberInputContainer}>
          <button 
            type="button"
            className={styles.numberControl}
            onClick={() => handleNumberChange({
              target: {
                name: 'quantityAvailable',
                value: Math.max(0, formData.quantityAvailable - 1)
              }
            })}
            disabled={formData.quantityAvailable <= 0}
          >
            -
          </button>
          <input
            type="text"
            id="quantityAvailable"
            name="quantityAvailable"
            value={formData.quantityAvailable}
            readOnly
            className={styles.numberInput}
          />
          <button 
            type="button"
            className={styles.numberControl}
            onClick={() => handleNumberChange({
              target: {
                name: 'quantityAvailable',
                value: formData.quantityAvailable + 1
              }
            })}
          >
            +
          </button>
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          rows="4"
        />
      </div>

      {/* <div className={styles.formGroup}>
        <label>Amenities</label>
        <div className={styles.amenityInput}>
          <input
            type="text"
            value={formData.newAmenity}
            onChange={(e) => setFormData(prev => ({ ...prev, newAmenity: e.target.value }))}
            placeholder="Add amenity"
            className={styles.input}
          />
          <button type="button" onClick={handleAmenityAdd} className={styles.addButton}>
            Add
          </button>
        </div>
        <div className={styles.amenitiesList}>
          {formData.amenities.map((amenity, index) => (
            <div key={index} className={styles.amenityPill}>
              {amenity}
              <button
                type="button"
                onClick={() => handleAmenityRemove(amenity)}
                className={styles.removeAmenity}
                aria-label={`Remove ${amenity}`}
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div> */}

      {/* Amenities Input (Edit Mode) */}
      <div className={styles.formGroup}>
        <label>Amenities</label>
        <div className={styles.amenityInput}>
          <input
            type="text"
            value={formData.newAmenity}
            onChange={(e) => setFormData(prev => ({ 
              ...prev, 
              newAmenity: e.target.value 
            }))}
            placeholder="Add amenity"
            className={styles.input}
            onKeyPress={(e) => e.key === 'Enter' && handleAmenityAdd()}
          />
          <button 
            type="button" 
            onClick={handleAmenityAdd}
            className={styles.addButton}
          >
            Add
          </button>
        </div>
        
        {/* Amenities Display */}
        <div className={styles.amenitiesList}>
          {formData.amenities.map((amenity, index) => (
            <div key={`${amenity}-${index}`} className={styles.amenityPill}>
              {amenity}
              {isEditMode && (
                <button
                  type="button"
                  onClick={() => handleAmenityRemove(amenity)}
                  className={styles.removeAmenity}
                  aria-label={`Remove ${amenity}`}
                >
                  &times;
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Room Images</label>
        
        {existingImages.length > 0 && (
          <div className={styles.existingImages}>
            <h4>Current Images</h4>
            <div className={styles.imageGrid}>
              {existingImages.map((image, index) => (
                <div key={index} className={styles.imagePreview}>
                  <img 
                    src={`${import.meta.env.VITE_FILE_API_URL}${image.url}`} 
                    alt={`Room image ${index}`}
                    className={styles.previewImage}
                  />
                  <button 
                    type="button" 
                    onClick={() => removeExistingImage(index, image._id)}
                    className={styles.removeImage}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div 
          className={`${styles.dropzone} ${isDragging ? styles.dragging : ''}`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleDropzoneClick}
        >
          <input
            type="file"
            id="files"
            name="files"
            onChange={handleFileChange}
            multiple
            accept="image/*"
            className={styles.fileInput}
            ref={fileInputRef}
          />
          <div className={styles.dropzoneContent}>
            <p>Drag & drop new images here or click to browse</p>
            <small>Only image files are accepted</small>
          </div>
        </div>
        
        {fileUploads.length > 0 && (
          <div className={styles.newUploads}>
            <h4>New Images to Upload</h4>
            <div className={styles.imageGrid}>
              {fileUploads.map((file, index) => (
                <div key={index} className={styles.filePreview}>
                  <img 
                    src={URL.createObjectURL(file)} 
                    alt={file.name} 
                    className={styles.previewImage}
                  />
                  <div className={styles.fileInfo}>
                    <span>{file.name}</span>
                    <span>{(file.size / 1024).toFixed(2)} KB</span>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeFile(index)} 
                    className={styles.removeFile}
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={styles.formActions}>
        <button 
          type="button" 
          onClick={() => setIsEditMode(false)} 
          className={styles.cancelButton}
        >
          Cancel
        </button>
        <button type="submit" className={styles.submitButton}>
          Save Changes
        </button>
      </div>
    </form>
  );

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>{isEditMode ? 'Edit Room' : 'Room Details'}</h2>
          <div className={styles.headerActions}>
            {!isEditMode && (
              <button 
                onClick={toggleEditMode} 
                className={styles.editButton}
              >
                Edit
              </button>
            )}
            <button className={styles.closeButton} onClick={onClose}>&times;</button>
          </div>
        </div>

        {isEditMode ? renderEditMode() : renderViewMode()}
      </div>
    </div>
  );
};

export default ViewPropertyRoomModal;