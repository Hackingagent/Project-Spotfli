import React from 'react';

// TableComponent definition
const TableComponent = ({ headers, data, actions }) => {
    return (
        <table className="mt-10 shadow-lg bg-white w-full">
            <thead className="bg-dark p-4 text-off_white font-normal border border-dark">
                <tr>
                    {headers.map((header, index) => (
                        <th
                            key={index}
                            className="px-4 py-4 font-normal text-[14px] text-start uppercase tracking-[.3em] border-rmd"
                        >
                            {header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={index} className="border-b border-off_white p-4">
                            {headers.slice(0, -1).map((header) => (
                                <td key={header} className="border border-[#ddd] px-4 py-4">
                                    {item[header.toLowerCase().replace(/\s+/g, '_')] || 'N/A'}
                                </td>
                            ))}
                            <td className=" px-4 py-4 flex flex-row gap-5">
                                {actions.map((action, actionIndex) => (
                                    <a
                                        key={actionIndex}
                                        onClick={() => action.handler(item)}
                                        className={` ${action.type} mx-1 `}
                                    >
                                        {action.icon}
                                    </a>
                                ))}
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={headers.length} className="text-center py-4">
                            No data available
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default TableComponent;