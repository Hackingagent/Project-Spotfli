import React from "react";
import HeaderStats from "../../../sections/header-stats/header-stats";
import Listings from '../../../home/listings/Listings';
import house1 from '../../../../assets/properties/house1.jpg';
import house2 from '../../../../assets/properties/house2.jpg';
import house3 from '../../../../assets/properties/house3.jpg';
import house4 from '../../../../assets/properties/house4.jpg';
import { Link } from 'react-router-dom';

const ViewProperty = () => {

    const MyProperties = [
        {
            id: 1,
            title: 'Down Quaters-Bambili',
            type: 'Apartment',
            price: 35000,
            rating: 4.4,
            image: house1,
        },
        {
          id: 2,
          title: 'Up Quaters-Bambili' ,
          type: 'Single Room',
          price: 25000,
          rating: 3.1,
          image: house2,
        },
        {
            id: 3,
            title: 'Up Quaters-Bambili' ,
            type: 'Self Content',
            price: 25000,
            rating: 4.3,
            image: house3,
          },
          {
            id: 4,
            title: 'Up Quaters-Bambili' ,
            type: '2 Bed Room Apartment',
            price: 25000,
            rating: 4.2,
            image: house4,
          },
        ]

    return (
        <>
            <HeaderStats
                heading= 'Add New Property'
                subheading= 'Add another property to the platform'
            />
 
        </>
    );
}

export default ViewProperty