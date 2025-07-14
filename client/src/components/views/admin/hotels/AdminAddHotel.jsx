import { FaTrash, FaEdit } from "react-icons/fa";
import TopNavigation from '../../../navigation/admin/top-navigation'
import TableComponent from '../../../sections/table/table-component'
import { useState } from "react";
import HotelRegistration from "./modals/HotelRegistration";

const AdminAddHotel = () => {
    const [registerHotel, showRegisterHotel] = useState(false)
    const hotelHeaders = ['Hotel Name','Location','Contact','addedBy','actions'];
    const toggleHotelRegistration = () => {
        showRegisterHotel(!registerHotel);
    }
    const data = [
        {
            name: 'Ken Wood',
            addedBy: 'Ivor',
        },
        {
            name: 'Ayaba Hotel',
            addedBy: 'Ivor',
        }
    ];
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
    {registerHotel && <HotelRegistration onClose={toggleHotelRegistration} />}
    {/* top navigation bar for  admin */}
     <TopNavigation heading={'Add Hotel'} />
     {/* table component displaying hotels */}
     <button className="btn btn-primary" onClick={toggleHotelRegistration}>Register Hotel <i className="fa fa-plus"></i></button>
     <TableComponent 
        headers={hotelHeaders}
        data={data}
        actions={actions}
    />
     </>
  )
}

export default AdminAddHotel
