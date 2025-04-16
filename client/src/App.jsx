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
import AdminSidebar from './components/navigation/admin/admin-sidebar';
import AdminDashboard from './components/views/admin/dasboard/admin-dashboard';
import ServiceProviderSidebar from './components/navigation/serviceProvider/service-provider-sidebar';
import PropertyOwnerSidebar from './components/navigation/propertyOwner/property-owner-sidebar';
import ViewProperty from './components/views/property-owner/view-property/view-property';
import MyPropertyDetails from './components/views/property-owner/view-property/property-details';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/register" element={<AccountType/>} />
        <Route path="/registerPS" element={<Register />} />
        <Route path="/registerSP" element={<RegisterServiceProvider/>} />
        <Route path="/registerPO" element={<RegisisterPropertyOwner />} />
        <Route path="/addService" element={<AddServiceInfo />} />
        <Route path="/experienceLevel" element={<ExperienceLevel/>} />
        <Route path="/propertyDetails" element={<PropertyDetails/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/chat' element={<ChatApp />} />

        <Route path='/admin'>
          <Route element={<AdminSidebar />}>
            <Route index element={<AdminDashboard />} />
          </Route>

        </Route>

        <Route path='/property-owner'>
          <Route element={<PropertyOwnerSidebar />}>
            <Route index />
            <Route path='view-properties' element={<ViewProperty />} />
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
