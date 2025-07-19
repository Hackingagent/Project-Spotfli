import React, { useEffect, useState } from "react";
import Notification from '../../../../notification/notification';
import TopNavigation from '../../../../navigation/admin/top-navigation';
import {  useLocation, useParams } from "react-router-dom";
import TableComponent from '../../../../sections/table/table-component';
import AddSubCategoryModal from "./modal/AddSubCategoryModal";
import { getSubCategories } from "../../../../../api/admin/category/category";



const AdminSubCategory = () => {
    const [addSubCategoryModal, setAddSubCategoryModal] = useState(false);
    // const [editService, isEditService] = useState(false);
    const [message, setMessage] = useState('');
    const { name } = useParams();
    const location = useLocation();
    const categoryData = location.state?.categoryData; 
    const [data, setData] = useState([]);

    const toggleAddService = () =>{
        setAddSubCategoryModal(!addSubCategoryModal);
        // isEditService(false);
    }
    const serviceHeaders = [
        'Name',
        'Description',
        'Admin',
        'actions'
    ]

    const fetchSubCategories = async() => {
        console.log("Getting Categories")
        const response = await getSubCategories(categoryData.id);

        console.log('Response from Function: ', response)
        setData(response.subCategory);
        setMessage(response.message);
        
        
    }

    useEffect(() => {
        fetchSubCategories()
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


            {addSubCategoryModal && <AddSubCategoryModal  close={() => setAddSubCategoryModal(false)} refresh = {() => fetchSubCategories()}  message = {(msg) => setMessage(msg)} id={categoryData.id} /> }

            {/* {editService && <EditCategoryModal close={() => isEditService(false)} refresh = {() => fetchCategories()} message = {(msg) => setMessage(msg)} data={editData} 
                
            />} */}
            <TopNavigation heading={`${name} Sub Categories`} />

            <div className="addCategoryBtn" onClick={toggleAddService} style={{width: '10.8rem'}}>
                Add Sub Category <i className="fa fa-plus"></i>
            </div>
            <TableComponent 
                headers={serviceHeaders}
                data={data}
                actions={actions}
            />
        </>
    )
}

export default AdminSubCategory

