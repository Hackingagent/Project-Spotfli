import React from 'react';
import styles from './table-component.module.css';
// TableComponent definition
const TableComponent = ({ headers, data, actions }) => {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
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
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={index} >
                            {headers.slice(0, -1).map((header) => (
                                <td key={header} >
                                    {item[header.toLowerCase().replace(/\s+/g, '_')] || 'N/A'}
                                </td>
                            ))}
                            <td >
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
    );
};

export default TableComponent;