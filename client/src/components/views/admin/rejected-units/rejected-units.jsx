import React from "react";
import HeaderStats from "../../../sections/header-stats/header-stats";
import { HiPencil } from "react-icons/hi";
import { RxCrossCircled } from "react-icons/rx";
import TableComponent from "../../../sections/table/table-component";

const RejectedUnits = () => {
    

     	//Table Head values
	const tableHeader = [
        "Id",
		"Post Title",
		"Date",
		"Views",
		"Owner",
	];

	//Table rows actions (edit and delete)
	const actions = [
        {
            label: "Edit",
            handler: (row) => {
				console.log('Row to edit', row);
				
			},
			icon: <HiPencil />,
            type: "text-green text-[20px]" // Customize button type (for styling)
        },
        {
            label: "Delete",
            handler: (row) => {
				console.log('Row to delete', row);
			},
			icon: <RxCrossCircled />,
            type: "text-red text-[20px]" // Customize button type (for styling)
        }
    ];
    

    return (
        <>
            <HeaderStats
                heading="Rejected Units"
                subheading="List of all rejected Units"
            />
            <TableComponent
                headers={tableHeader}
                data=""
                actions={actions}
            />


        </>
    )
}


export default RejectedUnits;