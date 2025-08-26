import React, { useState, useCallback, useRef } from 'react';
import styles from './PropertyRoomModal.module.css';

const PropertyRoomModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    // property: propertyId,
    roomType: '',
    livingRoom: 0,
    bedRoom: 0,
    toilet: 0,
    kitchen: 0,
    price: '',
    description: '',
    quantityAvailable: '',
    amenities: [],
    newAmenity: '',
    files: []
  });

  const [fileUploads, setFileUploads] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

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
    if (formData.newAmenity.trim() && !formData.amenities.includes(formData.newAmenity)) {
      setFormData(prev => ({
        ...prev,
        amenities: [...prev.amenities, prev.newAmenity.trim()],
        newAmenity: ''
      }));
    }
  };

  const handleAmenityRemove = (amenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.filter(a => a !== amenity)
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

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
        
        const formDataToSend = new FormData();
        
        // Append all form fields
        formDataToSend.append('roomType', formData.roomType);
        formDataToSend.append('livingRoom', formData.livingRoom);
        formDataToSend.append('bedRoom', formData.bedRoom);
        formDataToSend.append('toilet', formData.toilet);
        formDataToSend.append('kitchen', formData.kitchen);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('description', formData.description);
        formDataToSend.append('quantityAvailable', formData.quantityAvailable);

        formData.amenities.forEach(amenity => {
          formDataToSend.append('amenities', amenity);
        })
        // formDataToSend.append('amenities', JSON.stringify(formData.amenities));
        
        // Append each file
        fileUploads.forEach(file => {
        formDataToSend.append('files', file);
        });

        await onSubmit(formDataToSend);

        onClose();
    } catch (error) {
        console.log(error);
    }

    
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Add New Room</h2>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
                <label htmlFor="roomType">Room Type</label>
                <select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
                className={styles.selectInput}
                required
                >
                <option value="">Select Room Type</option>
                <option value="self-contain">Self Contain</option>
                <option value="studio">Studio</option>
                <option value="apartment">Apartment</option>
                <option value="others">Others</option>
                </select>
            </div>
          <div className={styles.roomFeatures}>
            <h3>Room Features</h3>
            <div className={styles.featureGrid}>

              {/* Living Room */}
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
                    disabled={formData.livingRoom <= 0} // Disable when at minimum
                  >
                    -
                  </button>
                  <input
                    type="text" // Changed from "number" to prevent keyboard input
                    id="livingRoom"
                    name="livingRoom"
                    value={formData.livingRoom}
                    readOnly // Prevents typing
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
                    disabled={formData.bedRoom <= 0} // Disable when at minimum
                  >
                    -
                  </button>
                  <input
                    type="text" // Changed from "number" to prevent keyboard input
                    id="bedRoom"
                    name="bedRoom"
                    value={formData.bedRoom}
                    readOnly // Prevents typing
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
                    disabled={formData.toilet <= 0} // Disable when at minimum
                  >
                    -
                  </button>
                  <input
                    type="text" // Changed from "number" to prevent keyboard input
                    id="toilet"
                    name="toilet"
                    value={formData.toilet}
                    readOnly // Prevents typing
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
                    disabled={formData.kitchen <= 0} // Disable when at minimum
                  >
                    -
                  </button>
                  <input
                    type="text" // Changed from "number" to prevent keyboard input
                    id="kitchen"
                    name="kitchen"
                    value={formData.kitchen}
                    readOnly // Prevents typing
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
            <input
              type="number"
              id="quantityAvailable"
              name="quantityAvailable"
              min="1"
              value={formData.quantityAvailable}
              onChange={handleNumberChange}
              required
              className={styles.input}
            />
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

          <div className={styles.formGroup}>
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
            <div className={styles.amenityList}>
              {formData.amenities.map(amenity => (
                <span key={amenity} className={styles.amenityTag}>
                  {amenity}
                  <button type="button" onClick={() => handleAmenityRemove(amenity)} className={styles.removeAmenity}>
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Upload Images</label>
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
                <p>Drag & drop images here or click to browse</p>
                <small>Only image files are accepted</small>
              </div>
            </div>
            
            {fileUploads.length > 0 && (
              <div className={styles.filePreviews}>
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
            )}
          </div>

          <div className={styles.formActions}>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button type="submit" className={styles.submitButton}>
              Save Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyRoomModal;