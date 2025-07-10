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


import ChatApp from './components/chat-system/ChatApp';
import AdminDashboard from './components/views/admin/dasboard/admin-dashboard';
import ServiceProviderSidebar from './components/navigation/serviceProvider/service-provider-sidebar';
import PropertyOwnerSidebar from './components/navigation/propertyOwner/property-owner-sidebar';
import ViewProperty from './components/views/property-owner/view-property/view-property';
import MyPropertyDetails from './components/views/property-owner/view-property/property-details';
import AddProperty from './components/views/property-owner/add-property/add-property';
import MoreInfo from './components/views/property-owner/add-property/more-info/more-info';
import AllUnits from './components/views/admin/all-units/all-units';
import PendingUnits from './components/views/admin/pending-units/pending-units';
import RejectedUnits from './components/views/admin/rejected-units/rejected-units';
import ReportedUnits from './components/views/admin/reported-units/reported-units';
import HomePage from './components/views/home-page';
import AdminLayout from './components/layout/admin/Admin-Layout';
import HotelDashboard from './components/propertyOwner/hotel-management/dashboard/HotelDashboard';
import AdminService from './components/views/admin/services/service';
import AdminLogin from './components/login/AdminLogin';
import BuyProperty from './components/views/user/buy-prop';
import AccountBillingView from './components/views/user/account-billing';
import ColivingView from './components/views/user/coliving-view';
import HotelsView from './components/views/user/hotels-view';
import SingleServiceView from './components/views/user/single-provider';
import UpdateAccountView from './components/views/user/update-account';
import HelpView from './components/views/user/help-view';
import VacationView from './components/views/user/vacation-plan';
import ServiceProviderView from './components/views/user/service-provider';

function App() {
  return (
    <div>
      <BrowserRouter>
      {/* Home Rout (Default) */}
      <Routes>
        <Route path='/more' element={<MoreInfo />} />
        <Route path="/" element={<HomePage />} />
      {/* Buy Property Rout */}
      <Route path="/buy" element={<BuyProperty/>} />
      {/* Service Provider Rout */}
      <Route path="/serviceProvider" element={<ServiceProviderView />} />
      {/* Single service provider Route */}
      <Route path='/singleprovider' element={<SingleServiceView />} />
      {/* hotels display route */}
      <Route path='/hotels' element={<HotelsView/>}/>
      {/* Rent Property Route */}
      <Route path='/rent' element={<BuyProperty />}/>
      {/* coliving page route */}
      <Route path='/coliving' element={<ColivingView />} />
      {/* Account And Billing Route */}
      <Route path='/accountbilling' element={<AccountBillingView />}/>
      {/* Update Account Routes */}
      <Route path='/update-account' element={<UpdateAccountView />}></Route>
      {/* Help and Support Route */}
      <Route path='/help'  element={<HelpView />}/>
      {/* Vacation Plan Route */}
      <Route path='/vacationPlan' element={<VacationView/>}/>
      {/* Manage hotel routes */}
      <Route path='/manage-hotel' element={<HotelDashboard />}> </Route>
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
        <Route path='/chatapp' element={<ChatApp />} />


        <Route path='/admin'>
          <Route path='login' element = {<AdminLogin />} />
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path='all-units' element={<AllUnits />}/>
            <Route path='pending-units' element={<PendingUnits />}/>
            <Route path='rejected-units' element={<RejectedUnits />}/>
            <Route path='reported-units' element={<ReportedUnits />}/>
            <Route path='services' element={<AdminService />} />
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
