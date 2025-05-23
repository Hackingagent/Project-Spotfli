import React, { useState } from 'react'
// import OptionBar from '../home/optionBar/OptionBar';
import house3 from '../../../../assets/properties/house3.jpg';
import house4 from '../../../../assets/properties/house4.jpg';
import house5 from '../../../../assets/properties/house5.jpg';
import house6 from '../../../../assets/properties/house6.jpg';
import house7 from '../../../../assets/properties/house7.jpg';
import styles from './property-details.module.css';


const MyPropertyDetails = () => {

    

    const images = [
        { id: 1, src: house3 },
        { id: 2, src: house4 },
        { id: 3, src: house5 },
        { id: 4, src: house6 },
        { id: 5, src: house7 },
    ];

    const [selectedImage, setSelectedImage] = useState(images[0].src);


    const handleImageClick = (src) => {
        setSelectedImage(src);
    };
    
  return (
    <>
    {/* <OptionBar /> */}
    <div className={styles.container}>
        <div className={styles.imageGallery}>
            <div className={styles.bigImage}>
                <img src={selectedImage}/>
            </div>
            <div className={styles.smallImagesContainer}>
                {images.map((image) => (
                    <img
                        key={image.id}
                        src={image.src}
                        alt={`Thumbnail ${image.id}`}
                        onClick={() => handleImageClick(image.src)}
                        className={styles.smallImages}
                    />
                 ))}
            </div>
        </div>
        <div className={styles.info}>
            <tr> <td className={styles.label}>Title:</td> <td className={styles.value}>Hello World</td></tr>
            <tr> <td className={styles.label}>Description:</td> <td className={styles.value}>Lorem Ipsum</td></tr>
            <tr> <td className={styles.label}>Number of Rooms:</td> <td className={styles.value}>30</td></tr>
            <tr> <td className={styles.label}>Available Rooms</td> <td className={styles.value}>10</td></tr>
            <tr> <td className={styles.label}>Rooms Occupied</td> <td className={styles.value}>20</td></tr>
        </div>

        <div className={styles.actions}>
            <button className={styles.edit}>Edit Property</button>
            <button className={styles.delete}>Delete Property</button>
        </div>
    </div>
    </>
  )
}

export default MyPropertyDetails
