import React, { useEffect, useState } from "react";
import TableComponent from '../../../sections/table/table-component';
import TopNavigation from '../../../navigation/admin/top-navigation';
import { FaTrash, FaEdit } from "react-icons/fa";
import {  getProvider, toggleProvider } from "../../../../api/admin/serviceProvider/admin-service-provider";
import ViewProviderModal from "./modals/ViewProvider";
import ConfirmationModal from '../../../confirmation-modal/ConfirmationModal';
import Notification from '../../../notification/notification';


const AdminPendingProvider = () => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const fetchProviders = async() => {
        console.log("Getting Pending Providers");
        const response = await getProvider('pending');
        console.log('Response from Function: ', response)
        setData(response.provider);
    }

    const handleApprove = () => {
        console.log('Approving: ', selectedData.id);
        setShowModal(false);
        setStatus('approved'),
        setConfirmationModal(true);
    }

    const handleDecline = () => {
        console.log('Declining: ', selectedData.id);
        setShowModal(false);
        setStatus('declined'),
        setConfirmationModal(true);
    }

    const handleConfirm = async(status) => {
        console.log('Selected Service: ', selectedData);
        console.log('Status in confirm message: ', status);

        try {
            const response = await toggleProvider(selectedData.id, status);
            setMessage(response.message);
            setConfirmationModal(false);
            fetchProviders();
        } catch (error) {
            console.log('error: ', error.message);
        }
    }

    
    useEffect(() => {
        fetchProviders()
    }, []);

    const serviceProviderHeadings = [
        'user',
        'service',
        'status',
        'actions',
    ]
    

    //Table rows actions (edit and delete)
	const actions = [
        {
            label: "view",
            handler: (row) => {
				console.log('Row to edit', row);
                setSelectedData(row);
                setShowModal(true);
                // toggleEditService();
                // setEditData(row);
				
			},
			icon: <i className='fa fa-eye' ></i>,
            type: "text-green text-[20px]" // Customize button type (for styling)
        },
        // {
        //     label: "Delete",
        //     handler: async(row) => {
		// 		console.log('Row to delete', row);
		// 		console.log('Row ID', row._id);
        //         // const response = await deleteService(row._id) //Delete FUnction called
        //         // setMessage(response.message)
        //         // fetchServices();
		// 	},
		// 	icon: <FaTrash />,
        //     type: "text-red text-[20px]" // Customize button type (for styling)
        // }
    ];

    return (
        <>
            {message && 
                <Notification 
                    message={message}
                    noMessage={()=>setMessage('')}
                    type='success'
                />
            }

            <TopNavigation heading={'Service Providers: Pending'} />
            {/* <div className="addServiceBtn" onClick={toggleAddService}>
                Add Service <i className="fa fa-plus"></i>
            </div> */}
            <TableComponent 
                headers={serviceProviderHeadings}
                data={data}
                actions={actions}
            />

            <ViewProviderModal 
                show={showModal}
                onClose={() =>  setShowModal(false)}
                application={selectedData}
                currentStatusPage="pending"
                onApprove={handleApprove}
                onReject={handleDecline}
            />

            <ConfirmationModal 
                isOpen={confirmationModal}
                message={
                    <>
                        Are you sure you want to Perform this action
                        <br />
                        <b>Name:</b> {selectedData.userDetails?.first_name}<br />
                        <b>Business Name:</b> {selectedData.name}<br />
                        <b>category</b> {selectedData.service}
                    </>
                }
                onClose={() => {
                    setConfirmationModal(false)
                    setStatus('')
                } }
                onConfirm={() => handleConfirm(status)}
                type={status}
            />
        </>
    )
}

export default AdminPendingProvider