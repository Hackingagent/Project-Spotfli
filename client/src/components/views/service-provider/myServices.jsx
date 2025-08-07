import React, { useState, useEffect } from "react";
import MyServiceCard from "../../statcard/MyServiceCard";
import ServiceProviderApplication from "../../account-billing/account/ServiceProviderAppication";
import styles from "./myServices.module.css"; // Importing CSS module
import { deleteService, getMyService, updateService } from "../../../api/user/serviceProvider/my-service";
import service1 from '../../../assets/service images/service1.jpg'


const MyServices = () => {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);



  const fetchServices = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await getMyService();
      setServices(data.service);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

    //Fetch  services  on component mount
  useEffect(() => {

    const fetchServices = async () => {
      //Replace with actual ApI
setServices([
      {
            id: 1,
            image: service1,
            name: 'Paul Nails',
            description: 'Lurem impus is the main person',
            price: 100,
            category: "Plumber",
            avialalibilty: "Available"
      },

      //More service types...
    ]);
    };
      fetchServices();
  }, []);

//   const handleCreateOrUpdate = async (serviceData) => {
//     try {
//         setIsLoading(true);
//         if (currentService);{

//             //Handle Update existing service fetch
//         const updatedService = await updateService.updateService(
//             currentService._id,
//           serviceData
//         );
//          setServices(services.map(s => 
//           s._id === updatedService._id ? updatedService : s
//         ));
//         }  
//          setIsModalOpen(false);
//       setCurrentService(null);
//     } catch (error) {
//         setError(error.message);
//     }finally {
//       setIsLoading(false);
//     }
//   }

  //Handle delete fetch
   
  
  const handleDelete = async (serviceId) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        setIsLoading(true);
        await  deleteService.deleteService(serviceId);
        setServices(services.filter(s => s._id !== serviceId));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const toggle = ()  => {
    setIsModalOpen(!isModalOpen)
  }


  return (
    <div className={styles.adminServices}>
      <div className= "hoteldash-rooms-header">
        <h1>Manage Services</h1>
        <button
          className="btn btn-primary"
          onClick={toggle}
          disabled={isLoading}

        >
          {isLoading ? 'Loading...' : '+ Apply For New Service'}
          
        </button>
      </div>

      <div className="hoteldash-room-types">
    {isLoading && services.length === 0 ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p>No services found. Create your first service!</p>
        ) : (
          services.map((service) => (
          //  <img src={service1} alt="" />
  
            <MyServiceCard                                              
              key={service._id}
             
              service={service}
              onEdit={() => {
                setCurrentService(service);
                setIsModalOpen(true);
              }}
              onDelete={() => handleDelete(service._id)}
            />

          ))
        )}
      </div>

        { isModalOpen && <ServiceProviderApplication toggleUpdatePanel={toggle} /> }


    </div>
  );
};

export default MyServices;
