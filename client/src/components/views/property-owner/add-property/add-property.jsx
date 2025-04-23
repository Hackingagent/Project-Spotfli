import React, { useState } from "react";
import HeaderStats from "../../../sections/header-stats/header-stats";
import { Link } from 'react-router-dom';
import styles from './add-property.module.css';
import MoreInfo from "./more-info/more-info";

const AddProperty = () => {

    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        category: '',
        subCategory: '',
        title: '',
        description: '',
        frontView: null,
        backView: null,
        leftView: null,
        rightView: null,
        video: null,
        livingRoom: '',
        room: '',
        toilet: '',
        kitchen: '',
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (event) => {
        const { name } = event.target;
        const selectedFile = event.target.files[0];
        setFormData({ ...formData, [name]: selectedFile });
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };
    
    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    };

    const handleDrop = (event, fieldName) => {
        event.preventDefault();
        event.stopPropagation();
        const droppedFile = event.dataTransfer.files[0];
        if (droppedFile) {
            setFormData({ ...formData, [fieldName]: droppedFile }); // Update state with the dropped file
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        // Submit the form data to the server
    };






    return (
        <>
            <HeaderStats
                heading= 'Add New Property'
                subheading= 'Add another property to the platform'
            />

            <div className={styles.body}>
                {step == 1 && (
                    <div className={styles.container}>
                        <p> Step 1: Select Category and Sub Category</p>
                        <form>
                            <label className={styles.input}>
                                Category
                                <select name="category" value={formData.category} onChange={handleInputChange} required>
                                    <option value=""> </option>
                                    <option value="For Rent">For Rent</option>
                                    <option value="For Sale">For Sale</option>
                                </select>
                            </label>

                            {formData.category == 'For Rent' && (
                                <label className={styles.input}>
                                    Sub Category
                                    <select name="subCategory" value={formData.subCategory} onChange={handleInputChange} required>
                                        <option value=""> </option>
                                        <option value="1 room">1 Room</option>
                                        <option value="1 room and toilet">1 Room and Toilet</option>
                                        <option value="1 room, kitchen and toilet">1 Room Kitchen and Toilet</option>
                                        <option value="studio">Studio</option>
                                        <option value="custom">Custom</option>

                                    </select>
                                </label>
                            )}
                            {formData.category == 'For Sale' && (
                                <label className={styles.input}>
                                    Sub Category
                                    <select name="subCategory" value={formData.subCategory} onChange={handleInputChange} required>
                                        <option value=""> </option>
                                        <option value="single family home">Single Family Home</option>
                                        <option value="town house">Town House</option>
                                        <option value="condominium">Condominium </option>
                                        <option value="apartment">Apartment </option>
                                        <option value="duplex">Duplex</option>
                                        <option value="triplex">Triplex</option>
                                        <option value="quadplex">Quadplex</option>
                                        <option value="bungalow">Bungalow</option>
                                        <option value="luxury home">Luxury Home</option>
                                        <option value="others">Others</option>

                                    </select>
                                </label>
                            )}


                            <button className={styles.next} type="button" onClick={handleNextStep}>
                                Next
                            </button>
                        </form>
                    </div>
                )}

                {step == 2 && (
                    <div className={styles.container}>
                        <p>Step 2: Provide more details</p>

                        <MoreInfo />

                        <button className={styles.back} type="button" onClick={handlePreviousStep}>
                            Back
                        </button>

                        <button className={styles.next} type="button" onClick={handleNextStep}>
                            Next
                        </button>
                    </div>
                )}

                {step == 3 && (
                    <div className={styles.container} onDragOver={handleDragOver} onDrop={(event) => handleDrop(event, 'frontView')}>
                        <p>Step 3 Upload Pictures and Video</p>
                        <form>
                            <label className={styles.input}>Front View </label>

                            <div className={styles.file_uploader}>
                                <input type="file" name="frontView" onChange={handleFileChange} id="front-input"/>
                                <label htmlFor="front-input" style={{cursor: 'pointer'}}>
                                    {formData.frontView ? formData.frontView.name : 'Drag & drop the image here or click to select one'}
                                </label>
                            </div>


                            <label className={styles.input}>Back View </label>

                            <div className={styles.file_uploader} onDrop={(event) => handleDrop(event, 'backView')}>
                                <input type="file" name="backView" onChange={handleFileChange} id="back-input"/>
                                <label htmlFor="back-input" style={{cursor: 'pointer'}}>
                                    {formData.backView ? formData.backView.name : 'Drag & drop the image here or click to select one'}
                                </label>
                            </div>


                            <label className={styles.input}>Right Side View </label>

                            <div className={styles.file_uploader} onDrop={(event) => handleDrop(event, 'rightView')}>
                                <input type="file" name="rightView" onChange={handleFileChange} id="right-input"/>
                                <label htmlFor="right-input" style={{cursor: 'pointer'}}>
                                    {formData.rightView ? formData.rightView.name : 'Drag & drop the image here or click to select one'}
                                </label>
                            </div>

                            

                            <label className={styles.input}>Left Side View </label>

                            <div className={styles.file_uploader} onDrop={(event) => handleDrop(event, 'leftView')}>
                                <input type="file" name="leftView" onChange={handleFileChange} id="left-input"/>
                                <label htmlFor="left-input" style={{cursor: 'pointer'}}>
                                    {formData.leftView ? formData.leftView.name : 'Drag & drop the image here or click to select one'}
                                </label>
                            </div>


                            <label className={styles.input}>Video Tour </label>

                            <div className={styles.file_uploader} onDrop={(event) => handleDrop(event, 'video')}>
                                <input type="file" name="video" onChange={handleFileChange} id="video-input"/>
                                <label htmlFor="video-input" style={{cursor: 'pointer'}}>
                                    {formData.video ? formData.video.name : 'Drag & drop the image here or click to select one'}
                                </label>
                            </div>

                            <button className={styles.back} type="button" onClick={handlePreviousStep}>
                                Back
                            </button>

                            <button className={styles.next} type="button" onClick={handleNextStep}>
                                Next
                            </button>
                        </form>
                    </div>
                )}
                {step == 4 && (
                    <div className={styles.container}>
                        <p>Step 4: Preview</p>
                        <form>
                            <label className={styles.input}>
                                Description:
                                <input type="text" name='description' value={formData.description} onChange={handleInputChange} />
                            </label>

                            <button className={styles.back} type="button" onClick={handlePreviousStep}>
                                Back
                            </button>

                            <button className={styles.next} type="button" onClick={handleNextStep}>
                                Next
                            </button>
                        </form>
                    </div>
                )}
            </div>


 
        </>
    );
}

export default AddProperty