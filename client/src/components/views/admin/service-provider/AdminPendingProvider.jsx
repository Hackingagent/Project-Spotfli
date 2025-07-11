import React, { useEffect, useState } from "react";
import TableComponent from '../../../sections/table/table-component';
import TopNavigation from '../../../navigation/admin/top-navigation';
import { FaTrash, FaEdit } from "react-icons/fa";
import { getPendingProvider } from "../../../../api/admin/serviceProvider/admin-service-provider";


const AdminPendingProvider = () => {

    const [data, setData] = useState([]);

    const fetchProviders = async() => {
        console.log("Getting Pending Providers");
        const response = await getPendingProvider();
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
        'actions',
    ]
    

    //Table rows actions (edit and delete)
	const actions = [
        {
            label: "view",
            handler: (row) => {
				console.log('Row to edit', row);
                // toggleEditService();
                // setEditData(row);
				
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
            <TopNavigation heading={'Service Providers: Pending'} />
            {/* <div className="addServiceBtn" onClick={toggleAddService}>
                Add Service <i className="fa fa-plus"></i>
            </div> */}
            <TableComponent 
                headers={serviceProviderHeadings}
                data={data}
                actions={actions}
            />
        </>
    )
}

export default AdminPendingProvider