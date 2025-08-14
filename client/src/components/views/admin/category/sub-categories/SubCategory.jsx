import React, { useEffect, useState } from "react";
import Notification from '../../../../notification/notification';
import TopNavigation from '../../../../navigation/admin/top-navigation';
import { useLocation, useParams, useNavigate } from "react-router-dom";
import TableComponent from '../../../../sections/table/table-component';
import AddSubCategoryModal from "./modal/AddSubCategoryModal";
import { getSubcategories } from "../../../../../api/admin/category/category";

const AdminSubCategory = () => {
    const navigate = useNavigate();
    const [addSubCategoryModal, setAddSubCategoryModal] = useState(false);
    const [message, setMessage] = useState('');
    const { name } = useParams();
    const location = useLocation();
    const categoryData = location.state?.categoryData; 
    const [data, setData] = useState([]);

    const toggleAddService = () => {
        setAddSubCategoryModal(!addSubCategoryModal);
    }

    const fetchSubCategories = async() => {
        const response = await getSubcategories(categoryData.id);
        setData(response.subcategory);
        setMessage(response.message);
    }

    useEffect(() => {
        fetchSubCategories()
    }, []);

    const serviceHeaders = ['Name', 'Description', 'Admin', 'Actions'];

    const actions = [
        {
            label: "view",
            handler: (row) => {
                navigate(`/admin/categories/${categoryData.id}/subcategories/${row.id}/fields`, {
                    state: { 
                        subCategoryData: row,
                        categoryData: categoryData
                    },
                });
            },
            icon: <i className='fa fa-eye'></i>,
            type: "text-green text-[20px]"
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

            {addSubCategoryModal && 
                <AddSubCategoryModal  
                    close={() => setAddSubCategoryModal(false)} 
                    refresh={() => fetchSubCategories()}  
                    message={(msg) => setMessage(msg)} 
                    id={categoryData.id} 
                /> 
            }

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

export default AdminSubCategory;