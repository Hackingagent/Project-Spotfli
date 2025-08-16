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
import AddProperty from './components/views/property/add-property/add-property';
import MoreInfo from './components/views/property/add-property/more-info/more-info';
import AllUnits from './components/views/admin/all-units/all-units';
import PendingUnits from './components/views/admin/pending-units/pending-units';
import RejectedUnits from './components/views/admin/rejected-units/rejected-units';
import ReportedUnits from './components/views/admin/reported-units/reported-units';
import HomePage from './components/views/home-page';
import AdminLayout from './components/layout/admin/Admin-Layout';

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
import UserProtectedRoute from './components/protected-routes/user-protected-route';
import AdminPendingProvider from './components/views/admin/service-provider/AdminPendingProvider';
import AdminApprovedProvider from './components/views/admin/service-provider/AdminApprovedProvider';
import AdminDeclinedProvider from './components/views/admin/service-provider/AdminDeclinedProvider';
import AdminCategory from './components/views/admin/category/Category';
import AdminSubCategory from './components/views/admin/category/sub-categories/SubCategory';
import SubcategoryFieldsPage from './components/views/admin/category/sub-categories/field/SubCategoryFieldsPage';
import AdminAddHotel from './components/views/admin/hotels/AdminAddHotel';
import ManageHotels from './components/views/admin/hotels/ManageHotels';
import HotelLogin from './components/login/HotelLogin';

import HotelLayout from './components/hotel/HotelLayout';
import HotelDashboard from './components/pages/hotel/HotelDashboard';
import ManageRooms from './components/hotel/HotelRooms/ManageRooms';
import ManageBookings from './components/hotel/HotelBookings/ManageBookings';
import PerformanceCharts from './components/hotel/HotelAnalytics/PerformanceCharts';
import ProfileSettings from './components/hotel/HotelSettings/ProfileSettings';
import OwnerDashboard from './components/views/property/dasboard/property-dashboard';
import PropertyDashboard from './components/views/property/dasboard/property-dashboard';
import PropertyLayout from './components/layout/property/Property-Layout';
import Properties from './components/views/property/view-property/properties';
import PropertyDetailPage from './components/properties/PropertyDetailPage/PropertyDetailPage';
import HotelOverview from './components/hotel/HotelOverview';
import SecuritySettings from './components/hotel/HotelSettings/SecuritySettings';
import HotelDetailsPage from './components/home/listings/hotel/HotelDetailsPage';

// import UserProtectedRoute from './components/protected-routes/user-protected-route';
function App() {
  return (
    <div>
      <BrowserRouter>
      {/* Home Rout (Default) */}
      <Routes>
        <Route path='/more' element={<MoreInfo />} />
        <Route path="/" element={<HomePage />} />
      {/* Buy Property Rout */}
      <Route path="/buy" element={<UserProtectedRoute><BuyProperty/></UserProtectedRoute>} />
      {/* Service Provider Rout */}
      <Route path="/serviceProvider" element={<ServiceProviderView />} />
      {/* Single service provider Route */}
      <Route path='/singleprovider' element={<SingleServiceView />} />
      {/* hotels display route */}
      <Route path='/hotels' element={<HotelsView/>}/>
      <Route path='/hotel/:id' element={
        <>
        <UserProtectedRoute>
          <Home />
          <HotelDetailsPage />
        </UserProtectedRoute>
        </>} 
        />
      {/* Rent Property Route */}
      <Route path='/rent' element={<BuyProperty />}/>
      {/* coliving page route */}
      <Route path='/coliving' element={<ColivingView />} />
      {/* Account And Billing Route */}
      <Route path='/accountbilling' element={<UserProtectedRoute><AccountBillingView /></UserProtectedRoute>}/>
      {/* Update Account Routes */}
      <Route path='/update-account' element={<UserProtectedRoute><UpdateAccountView /></UserProtectedRoute>}></Route>
      {/* Help and Support Route */}
      <Route path='/help'  element={<UserProtectedRoute><HelpView /></UserProtectedRoute>}/>
      {/* Vacation Plan Route */}
      <Route path='/vacationPlan' element={<UserProtectedRoute><VacationView/></UserProtectedRoute>}/>
      {/* Manage hotel routes */}
      <Route path='/manage-hotel' element={<HotelDashboard />}> </Route>
      {/* Register Routes */}
        <Route path="/register" element={<Register/>} />
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
            <Route path='service-provider/pending' element={<AdminPendingProvider />} />
            <Route path='service-provider/approved' element={<AdminApprovedProvider />} />
            <Route path='service-provider/declined' element={<AdminDeclinedProvider />} />
            <Route path='category' element={<AdminCategory />} />
            <Route path='category/:name' element={<AdminSubCategory />} />
            <Route 
              path="categories/:categoryId/subcategories/:subcategoryId/fields" 
              element={<SubcategoryFieldsPage />} 
            />
                        
            {/* admin hotel management routes */}
            <Route path='hotel' element={<AdminAddHotel/>}></Route>
            <Route path='manage-hotels' element={<ManageHotels />}></Route>
          </Route>
        </Route>

    <Route>
      <Route path='/hotel'>
        <Route path='login' element={<HotelLogin />} />
        <Route element={<HotelLayout />}>
          <Route index element={<HotelOverview />} />
          <Route path='overview' element={<HotelOverview />} />
          <Route path='rooms' element={<ManageRooms />} />
          <Route path='bookings' element={<ManageBookings />} />
          <Route path='analytics' element={<PerformanceCharts />} />
          <Route path='settings' element={<ProfileSettings />} />
          <Route path='security' element={<SecuritySettings />} />
        </Route>
      </Route>
    </Route>


        <Route path='/property'>
          <Route element={<PropertyLayout />}>
            <Route index element={<PropertyDashboard />}/>
            <Route path='view-properties' element={<Properties />} />
            <Route path='add-property' element={<AddProperty />} />
            <Route path='property-details/:id'  element={<PropertyDetailPage />} />
            {/* <Route path="my-property-details" element={<MyPropertyDetails />} /> */}
          </Route>
        </Route>

        {/* <Route path='test' element={<OwnerDashboard />} /> */}


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
