import React, { useEffect, useState } from "react";
import TopNavigation from "../../../navigation/admin/top-navigation";
import TableComponent from "../../../sections/table/table-component";
import { HiPencil } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";
import './Category.css'
import { FaTrash, FaEdit } from "react-icons/fa";
import Notification from "../../../notification/notification";
import AddCategoryModal from "./modal/AddCategoryModal";
import EditCategoryModal from "./modal/EditCategoryModal";
import { getCategories } from "../../../../api/admin/category/category";
import { useNavigate } from "react-router-dom";
import slugify from 'slugify';


const AdminCategory = () => {
    const [serviceModal, isServiceModal] = useState(false);
    const navigate = useNavigate();
    // const [editService, isEditService] = useState(false);
    const [message, setMessage] = useState('');
    
    const [data, setData] = useState([]);

    const toggleAddService = () =>{
        isServiceModal(!serviceModal);
        // isEditService(false);
    }
    const serviceHeaders = [
        'Name',
        'Admin',
        'actions'
    ]

    const fetchCategories = async() => {
        console.log("Getting Categories")
        const response = await getCategories();

        console.log('Response from Function: ', response)
        setData(response.category);
        setMessage(response.message);
        
        
    }

    useEffect(() => {
        fetchCategories()
    }, []);

    // const serviceData = [
    //     {id: 1, name: 'plumbing', fee:500, addedby: 'Afa'}
    // ]

    	//Table rows actions (edit and delete)
	const actions = [
        {
            label: "view",
            handler: (row) => {
				console.log('Row to edit', row);
                navigate(`/admin/category/${slugify(row.name)}`, {
                    state: { 
                      categoryData: row // Use descriptive key
                    }
                });
                // setSelectedData(row);
                // setShowModal(true);
                // toggleEditService();
                // setEditData(row);
				
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


            {serviceModal && <AddCategoryModal close={() => isServiceModal(false)} refresh = {() => fetchCategories()}  message = {(msg) => setMessage(msg)} /> }

            {/* {editService && <EditCategoryModal close={() => isEditService(false)} refresh = {() => fetchCategories()} message = {(msg) => setMessage(msg)} data={editData} 
                
            />} */}
            <TopNavigation heading={'Categories'} />

            <div className="addCategoryBtn" onClick={toggleAddService}>
                Add Category <i className="fa fa-plus"></i>
            </div>
            <TableComponent 
                headers={serviceHeaders}
                data={data}
                actions={actions}
            />
        </>
    )
}

export default AdminCategory

