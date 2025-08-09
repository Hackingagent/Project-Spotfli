import React, { useEffect, useState } from "react";
import TableComponent from '../../../sections/table/table-component';
import TopNavigation from '../../../navigation/admin/top-navigation';
import { FaTrash, FaEdit } from "react-icons/fa";
import { RxCrossCircled } from "react-icons/rx";
import ConfirmationModal from '../../../confirmation-modal/ConfirmationModal';
import Notification from '../../../notification/notification';
import { getProperties, toggleProperty } from "../../../../api/admin/properties/property";
import ViewPropertyModal from "./modals/ViewProperty";


const AdminApprovedProperties = () => {

    const [data, setData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState([]);
    const [status, setStatus] = useState('');
    const [confirmationModal, setConfirmationModal] = useState(false);
    const [message, setMessage] = useState('');


    const fetchProviders = async() => {

        console.log("Getting Pending Providers");
        const response = await getProperties('approved');
        console.log('Response from Function: ', response)
        setData(response.properties);
    }

    
    useEffect(() => {
        fetchProviders()
    }, []);

    const propertyHeadings = [
        'user',
        'status',
        'admin',
        'actions',
    ]

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

            <TopNavigation heading={'Properties: Approved'} />
            {/* <div className="addServiceBtn" onClick={toggleAddService}>
                Add Service <i className="fa fa-plus"></i>
            </div> */}
            <TableComponent 
                headers={propertyHeadings}
                data={data}
                actions={actions}
            />


            <ViewPropertyModal 
                show={showModal}
                onClose={() =>  setShowModal(false)}
                property={selectedData}
                currentStatusPage="Approved"
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

export default AdminApprovedProperties