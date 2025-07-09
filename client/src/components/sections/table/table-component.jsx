import React, { useState } from 'react';
import styles from './table-component.module.css';
// TableComponent definition
const TableComponent = ({ headers, data, actions }) => {

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10; // Set the number of items per page

    // Calculate the index of the last item on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    // Calculate the index of the first item on the current page
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // Get the current items to display
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages
    const totalPages = Math.ceil(data.length / itemsPerPage);

    // Pagination handler
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr >
                        <th>Id</th>
                        {headers.map((header, index) => (
                            <th
                                key={index}
                            >
                                {header}
                            </th>
                        ))}
                        
                    </tr>
                </thead>
                <tbody>
                    {currentItems.length > 0 ? (
                        currentItems.map((item, index) => (
                            <tr key={index} className='table-row' >

                                <td>{index+1}</td>
                                {headers.slice(0, -1).map((header) => (
                                    <td key={header} >
                                        {item[header.toLowerCase().replace(/\s+/g, '_')] || 'N/A'}
                                    </td>
                                ))}
                                <td className={styles.table_actions}>
                                    {actions.map((action, actionIndex) => (
                                        <a
                                            key={actionIndex}
                                            onClick={() => action.handler(item)}
                                            
                                        >
                                            {action.icon}
                                        </a>
                                    ))}
                                </td>
                            </tr>
                            
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers.length} >
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {/* Pagination Controls */}
            <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
                <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={currentPage === index + 1 ? styles.active : ''}
                >
                    {index + 1}
                </button>
            ))}
            </div>
        </div>
    );
};

export default TableComponent;