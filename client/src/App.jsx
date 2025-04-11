import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register/propertySeeker/Register';
import AccountType from './components/register/AccountType';
import RegisterServiceProvider from './components/register/serviceProvider/RegisterServiceProvider';
import RegisisterPropertyOwner from './components/register/propertyOwner/RegisisterPropertyOwner';
import AddServiceInfo from './components/register/serviceProvider/AddServiceInfo';
import ExperienceLevel from './components/register/serviceProvider/ExperienceLevel';
import Login from './components/login/Login';
import Home from './components/home/Home';
import PropertyDetails from './components/propertyDetails/PropertyDetails';
import DefaultListings from './components/home/listings/DefaultListings';
import Buy from './components/home/listings/buy/Buy';

import Services from './components/home/listings/service provider/Services';
import Hotel from './components/home/listings/hotel/Hotel';
import Rent from './components/home/listings/rent/Rent';
import CoLiving from './components/home/listings/co-living/CoLiving';
import SingleProvider from './components/home/listings/service provider/SingleProvider';

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* Home Rout (Default) */}
      <Routes>
        <Route path="/" element={
          <>
            <Home/>
            <DefaultListings/>
            <Buy/>
            <Services />
            <Hotel />
          </>
      } />

      {/* Buy Property Rout */}
      <Route path="/buy" element={
        <>
        <Home />
        <Buy />
        </>
      } />

      {/* Service Provider Rout */}
      <Route path="/serviceProvider" element={
        <>
        <Home />
        <Services />
        </>
      } />

      {/* Single service provider Route */}
      <Route path='/singleprovider' element={
        <>
        <Home />
        <SingleProvider />
        </>
      } />

      {/* hotels display route */}
      <Route path='/hotels' element={
        <>
        <Home />
        <Hotel />
        </>
      }/>
      {/* Rent Property Route */}
      <Route path='/rent' element={
        <>
        <Home />
        <Rent />
        </>
      }/>

      {/* coliving page route */}
      <Route path='/coliving' element={
        <>
        <Home />
        <CoLiving />
        </>
      } />

      {/*  */}




      {/* Register Routes */}
        <Route path="/register" element={<AccountType/>} />
        <Route path="/registerPS" element={<Register />} />
        <Route path="/registerSP" element={<RegisterServiceProvider/>} />
        <Route path="/registerPO" element={<RegisisterPropertyOwner />} />
        <Route path="/addService" element={<AddServiceInfo />} />
        <Route path="/experienceLevel" element={<ExperienceLevel/>} />
        <Route path="/propertyDetails" element={<><Home /><PropertyDetails/></>} />
        {/* Login Routes */}
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
