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
import Buy from './components/home/listings/buy/Buy';

import Services from './components/home/listings/service provider/Services';
import Hotel from './components/home/listings/hotel/Hotel';
import Rent from './components/home/listings/rent/Rent';
import CoLiving from './components/home/listings/co-living/CoLiving';
import SingleProvider from './components/home/listings/service provider/SingleProvider';
import AccountBilling from './components/account-billing/AccountBilling';
import HelpSupport from './components/help-support/HelpSupport';
import VacationPlan from './components/VacationPlan/VacationPlan';
import RoommateFinder from './components/home/listings/roomate/RoommateFinder';
import ChatApp from './components/chat-system/ChatApp';
import AdminSidebar from './components/navigation/admin/admin-sidebar';
import AdminDashboard from './components/views/admin/dasboard/admin-dashboard';
import ServiceProviderSidebar from './components/navigation/serviceProvider/service-provider-sidebar';
import PropertyOwnerSidebar from './components/navigation/propertyOwner/property-owner-sidebar';
import ViewProperty from './components/views/property-owner/view-property/view-property';
import MyPropertyDetails from './components/views/property-owner/view-property/property-details';
import AddProperty from './components/views/property-owner/add-property/add-property';
import MoreInfo from './components/views/property-owner/add-property/more-info/more-info';
import TableComponent from './components/sections/table/table-component';
import AllUnits from './components/views/admin/all-units/all-units';
import PendingUnits from './components/views/admin/pending-units/pending-units';
import RejectedUnits from './components/views/admin/rejected-units/rejected-units';
import ReportedUnits from './components/views/admin/reported-units/reported-units';
import HomePage from './components/views/home-page';
import AdminLayout from './components/layout/admin/Admin-Layout';

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* Home Rout (Default) */}
      <Routes>

        <Route path='/more' element={<MoreInfo />} />

        <Route path="/" element={<HomePage />} />

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
        <RoommateFinder />
        </>
      } />

      {/* Account And Billing Route */}

      <Route path='/accountbilling' element={
        <>
        <Home />
        <AccountBilling />
        </>
      }/>
      {/* Help and Support Route */}
      <Route path='/help'  element={
        <>
        <Home />
        <HelpSupport />
        </>
      }/>

      {/* Vacation Plan Route */}
      <Route path='/vacationPlan' element={
        <>
        <Home />
        <VacationPlan />
        </>
      }/>



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
        <Route path='/chat' element={<ChatApp />} />

        <Route path='/admin'>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='all-units' element={<AllUnits />}/>
            <Route path='pending-units' element={<PendingUnits />}/>
            <Route path='rejected-units' element={<RejectedUnits />}/>
            <Route path='reported-units' element={<ReportedUnits />}/>
          </Route>

        </Route>

        <Route path='/property-owner'>
          <Route element={<PropertyOwnerSidebar />}>
            <Route index />
            <Route path='view-properties' element={<ViewProperty />} />
            <Route path='add-property' element={<AddProperty />} />
            <Route path="my-property-details" element={<MyPropertyDetails />} />

          </Route>

        </Route>

        <Route path='/service-provider'>
          <Route element={<ServiceProviderSidebar />}>
            <Route index />
          </Route>

        </Route>


      </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
