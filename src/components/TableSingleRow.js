import React from 'react';

const TableSingleRow = () => {
    return (
            <tbody>
            <tr class="bg-[#BCBCBC] border-b border-[#000] dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap border-r border-[#000]">
                    Apple MacBook Pro 17"
                </th>
                <td class="px-6 py-4 border-r border-[#000]">
                    Sliver
                </td>
                <td class="px-6 py-4 border-r border-[#000]">
                    Laptop
                </td>
                <td class="px-6 py-4 border-r border-[#000]">
                    $2999
                </td>
                <td class="px-6 py-4 border-r border-[#000]">
                    $2999
                </td>
                <td class="px-6 py-4 text-left">
                    <a href="#" class="font-medium border-r border-[#000] pr-4 text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="pl-4 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
            </tr>
        </tbody>
    );
};

export default TableSingleRow;