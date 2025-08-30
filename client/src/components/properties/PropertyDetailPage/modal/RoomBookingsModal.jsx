import React, { useState, useCallback, useRef } from 'react';
import styles from './PropertyRoomModal.module.css';
import image from '../../../../assets/profile.jpg';

const RoomBookingModal = ({ onClose, onSubmit }) => {
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
          <h2>View Room Property</h2>
          <button className={styles.closeButton} onClick={onClose}>&times;</button>
        </div>

        <div className={styles.bookingContainer}>
            <div className={styles.bookingDetails}>
                <div className={styles.bookingImage}>
                    <img src={image}/>
                </div>
                <div className={styles.bookingsDetails}>

                </div>

            </div>

            <div className={styles.bookingDetails}>
                <div className={styles.bookingImage}>
                    <img src={image}/>
                </div>
                <div className={styles.bookingsDetails}>

                </div>

            </div>
        </div>
        

      </div>
    </div>
  );
};

export default RoomBookingModal;