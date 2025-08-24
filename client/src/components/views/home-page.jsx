import React from "react";
import Home from '../home/Home';
import DefaultListings from '../home/listings/DefaultListings';
import Buy from '../home/listings/buy/Buy';
import Services from '../home/listings/service provider/Services';
import Hotel from '../home/listings/hotel/Hotel';
import Rent from '../home/listings/rent/Rent';

const HomePage = () => {
    return  (
        <>
            <Home/> 
            <DefaultListings/>
            <Buy/>
            <Rent />
            <Services />
            <Hotel />
        </>
    )
}

export default HomePage;