import { FaTrash, FaEdit } from "react-icons/fa";
import TopNavigation from '../../../navigation/admin/top-navigation'
import TableComponent from '../../../sections/table/table-component'
import { useState, useEffect } from "react";
import HotelRegistration from "./modals/HotelRegistration";
import { getHotels } from "../../../../api/admin/hotel/adminHotelApi"; // Import your API function

const AdminAddHotel = () => {
    const [registerHotel, showRegisterHotel] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const hotelHeaders = ['Hotel_Name', 'Location', 'Contact', 'Added_By', 'Actions'];

    const fetchHotels = async () => {
        try {
            const response = await getHotels();
            setHotels(response.data);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };
    // Fetch hotels on component mount
    useEffect(() => {
        fetchHotels();
    }, []);

    const toggleHotelRegistration = () => {
        showRegisterHotel(!registerHotel);
    };

    // Format the data for your table
    const formatHotelData = () => {
        return hotels.map(hotel => ({
            _id: hotel._id,
            hotel_name: `${hotel.hotelName}`,
            location: `${hotel.address}`,
            contact: `${hotel.phone}`,
            added_by: hotel.addedBy?.username || 'Admin', // Assuming addedBy is populated
            originalData: hotel // Keep reference to original data
        }));
    };

    const actions = [
        {
            label: "Edit",
            handler: (row) => {
                console.log('Row to edit', row.originalData);
                // toggleEditService();
                // setEditData(row.originalData);
            },
            icon: <FaEdit />,
            type: "text-green text-[20px]"
        },
        {
            label: "Delete",
            handler: async (row) => {
                console.log('Row to delete', row.originalData);
                console.log('Row ID', row._id);
                // const response = await deleteService(row._id);
                // setMessage(response.message);
                // fetchHotels(); // Refresh the list after deletion
            },
            icon: <FaTrash />,
            type: "text-red text-[20px]"
        }
    ];

    // Handle successful hotel registration
    const handleHotelRegistered = (newHotel) => {
        setHotels(prev => [...prev, newHotel]);
        toggleHotelRegistration();
    };

    if (loading) return <div>Loading hotels...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            {registerHotel && <HotelRegistration onClose={toggleHotelRegistration} onSuccess={handleHotelRegistered} refresh={fetchHotels} />}
            <TopNavigation heading={'Add Hotel'} />
            <button className="btn btn-primary" onClick={toggleHotelRegistration}>
                Register Hotel <i className="fa fa-plus"></i>
            </button>
            <TableComponent 
                headers={hotelHeaders}
                data={formatHotelData()}
                actions={actions}
            />
        </>
    );
};

export default AdminAddHotel;