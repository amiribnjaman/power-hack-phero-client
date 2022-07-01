import React from 'react';

const TableSingleRow = (props) => {
    const {_id, name, email, phone, amount} = props.bill
    console.log(props);
    return (
            <tbody>
            <tr class="bg-[#F0F8FF] border-b border-[#e2edf7] text-black">
                <th scope="row" class="px-6 py-4 font-medium text-black dark:text-white whitespace-nowrap border-r border-[#e2edf7]">
                    {_id}
                </th>
                <td class="px-6 py-4 border-r border-[#e2edf7]">
                    {name}
                </td>
                <td class="px-6 py-4 border-r border-[#e2edf7]">
                    {email}
                </td>
                <td class="px-6 py-4 border-r border-[#e2edf7]">
                    {phone}
                </td>
                <td class="px-6 py-4 border-r border-[#e2edf7]">
                    ${amount}
                </td>
                <td class="px-6 py-4 text-left">
                    <a href="#" class="font-medium border-r-2 border-[#e2edf7] pr-4 text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                    <a href="#" class="pl-4 font-medium text-blue-600 dark:text-blue-500 hover:underline">Delete</a>
                </td>
            </tr>
        </tbody>
    );
};

export default TableSingleRow;