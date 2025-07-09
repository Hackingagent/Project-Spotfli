import React, { useEffect, useState } from "react";
import TopNavigation from "../../../navigation/admin/top-navigation";
import TableComponent from "../../../sections/table/table-component";
import { HiPencil } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";
import './service.css'
import { FaTrash, FaEdit } from "react-icons/fa";
import AddServiceModal from "./modals/AddServiceModal";
import EditService from "./modals/EditService";
import { deleteService, getServices } from "../../../../api/admin/services/service";
import Notification from "../../../notification/notification";


const AdminService = () => {
    const [serviceModal, isServiceModal] = useState(false);
    const [editService, isEditService] = useState(false);
    const [message, setMessage] = useState('');
    const [editData, setEditData] = useState([]);
    const toggleEditService = () =>{
        isEditService(!editService);
        isServiceModal(false)
    }
    const [data, setData] = useState([]);

    const toggleAddService = () =>{
        isServiceModal(!serviceModal);
        isEditService(false);
    }
    const serviceHeaders = [
        'name',
        'fee',
        'addedBy',
        'actions'
    ]

    const fetchServices = async() => {
        console.log("Getting Services")
        const response = await getServices();
        console.log('Response from Function: ', response)
        setData(response.service);
    }

    useEffect(() => {
        fetchServices()
    }, []);

    // const serviceData = [
    //     {id: 1, name: 'plumbing', fee:500, addedby: 'Afa'}
    // ]

    	//Table rows actions (edit and delete)
	const actions = [
        {
            label: "Edit",
            handler: (row) => {
				console.log('Row to edit', row);
                toggleEditService();
                setEditData(row);
				
			},
			icon: <FaEdit />,
            type: "text-green text-[20px]" // Customize button type (for styling)
        },
        {
            label: "Delete",
            handler: async(row) => {
				console.log('Row to delete', row);
				console.log('Row ID', row._id);
                const response = await deleteService(row._id) //Delete FUnction called
                setMessage(response.message)
                fetchServices();
			},
			icon: <FaTrash />,
            type: "text-red text-[20px]" // Customize button type (for styling)
        }
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

            {serviceModal && <AddServiceModal close={() => isServiceModal(false)} refresh = {() => fetchServices()} message = {(msg) => setMessage(msg)} /> }

            {editService && <EditService close={() => isEditService(false)} refresh = {() => fetchServices()} message = {(msg) => setMessage(msg)} data={editData} 
                
            />}
            <TopNavigation heading={'Services'} />
            <div className="addServiceBtn" onClick={toggleAddService}>
                Add Service <i className="fa fa-plus"></i>
            </div>
            <TableComponent 
                headers={serviceHeaders}
                data={data}
                actions={actions}
            />
        </>
    )
}

export default AdminService

