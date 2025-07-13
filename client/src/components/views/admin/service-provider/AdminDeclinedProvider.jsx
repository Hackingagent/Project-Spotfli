import React, { useEffect, useState } from "react";
import TableComponent from '../../../sections/table/table-component';
import TopNavigation from '../../../navigation/admin/top-navigation';
import { FaTrash, FaEdit } from "react-icons/fa";
import { getProvider, toggleProvider } from "../../../../api/admin/serviceProvider/admin-service-provider";
import ViewProviderModal from './modals/ViewProvider';
import ConfirmationModal from '../../../confirmation-modal/ConfirmationModal';
import Notification from '../../../notification/notification';


const AdminDeclinedProvider = () => {

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [status, setStatus] = useState('');
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [message, setMessage] = useState('');


    const fetchProviders = async() => {
        console.log("Getting Pending Providers");
        const response = await getProvider('declined');
        console.log('Response from Function: ', response)
        setData(response.provider);
    }

    
    useEffect(() => {
        fetchProviders()
    }, []);

    const serviceProviderHeadings = [
        'user',
        'service',
        'status',
        'admin',
        'actions',
    ]

    const handleApprove = () => {
        console.log('Approving: ', selectedData.id);
        setShowModal(false);
        setStatus('approved'),
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
    

    //Table rows actions (edit and delete)
	const actions = [
        {
            label: "view",
            handler: (row) => {
				console.log('Row to edit', row);
                setSelectedData(row);
                setShowModal(true);
				
			},
			icon: <FaEdit />,
            type: "text-green text-[20px]" // Customize button type (for styling)
        },
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

            <TopNavigation heading={'Service Providers: Declined'} />
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
                currentStatusPage="Declined"
                onApprove={handleApprove}
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

export default AdminDeclinedProvider