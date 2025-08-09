import React, { useEffect, useState } from "react";
import TableComponent from '../../../sections/table/table-component';
import TopNavigation from '../../../navigation/admin/top-navigation';
import { FaTrash, FaEdit } from "react-icons/fa";
import ConfirmationModal from '../../../confirmation-modal/ConfirmationModal';
import Notification from '../../../notification/notification';
import { getProperties, toggleProperty } from "../../../../api/admin/properties/property";
import ViewPropertyModal from "./modals/ViewProperty";


const AdminPendingProperties = () => {

    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState('');

    const fetchProperties = async() => {
        console.log("Getting Pending Providers");
        const response = await getProperties('submitted');
        console.log('Response from Function: ', response)
        setData(response.properties);
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
        console.log('Selected Property: ', selectedData);
        console.log('Status in confirm message: ', status);

        try {
            const response = await toggleProperty(selectedData._id, status);
            setMessage(response.message);
            setConfirmationModal(false);
            fetchProperties();
        } catch (error) {
            console.log('error: ', error.message);
        }
    }

    
    useEffect(() => {
        fetchProperties()
    }, []);

    const serviceProviderHeadings = [
        'user',
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
				
			},
			icon: <i className='fa fa-eye' ></i>,
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

            <TopNavigation heading={'Properties: Pending'} />
            {/* <div className="addServiceBtn" onClick={toggleAddService}>
                Add Service <i className="fa fa-plus"></i>
            </div> */}
            <TableComponent 
                headers={serviceProviderHeadings}
                data={data}
                actions={actions}
            />

            <ViewPropertyModal 
                show={showModal}
                onClose={() =>  setShowModal(false)}
                property={selectedData}
                currentStatusPage="Pending"
                onApprove={handleApprove}
                onDecline={handleDecline}
            />

            <ConfirmationModal 
                isOpen={confirmationModal}
                message={
                    <>
                        Are you sure you want to Perform this action
                        <br />
                        <b>Name:</b> {selectedData.userDetails?.first_name} {selectedData.userDetails?.last_name}<br />
                        <b>Title</b> {selectedData.data?.title}<br />
                        <b>category</b> {selectedData.category?.name} <br />
                        <b>Sub Category</b> {selectedData.subcategory?.name}
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

export default AdminPendingProperties