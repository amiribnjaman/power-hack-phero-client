import React, { useState } from 'react';
import { toast } from 'react-toastify';

const TableSingleRow = ({ bill, reRender, setReRender }) => {
    const { _id, name, email, phone, amount } = bill

    const [updateFormToggle, setUpdateFormToggle] = useState(false)
    const [deleteBtnToggle, setDeleteBtnToggle] = useState(false)

    const [upName, setUpName] = useState('')
    const [upEmail, setUpEmail] = useState('')
    const [upPhone, setUpPhone] = useState('')
    const [upAmount, setUpAmount] = useState('')

    // Handle Delete function
    const handleBillDelete = () => {
        fetch(`https://boxing-eh-11906.herokuapp.com/api/delete-billing/${_id}`, {
            method: 'DELETE',
            headers: {
                'authorization': 'Bearer ' + localStorage.getItem('accessToken')
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.status == '401') {
                    toast.error(data.msg)
                    setDeleteBtnToggle(!deleteBtnToggle)
                } else {
                    toast.info('Bill Deleted!')
                    setDeleteBtnToggle(!deleteBtnToggle)
                    setReRender(!reRender)
                }
            })
    }

    // Handle update function
    const handleBillUpdate = e => {
        e.preventDefault()

        const data = {
            name: upName || name,
            email: upEmail || email,
            phone: upPhone || phone,
            amount: upAmount || amount
        }

        if (upName || upEmail || upPhone || upAmount) {
            fetch(`https://boxing-eh-11906.herokuapp.com/api/update-billing/${_id}`, {
                method: 'PUT',
                headers: {
                    'authorization': 'Bearer' + localStorage.getItem('accessToken'),
                    'content-type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    setUpdateFormToggle(!updateFormToggle)
                    setReRender(!reRender)
                })
            e.target.reset()
        }
    }


    return (
        <tbody>
            <tr class="bg-[#F0F8FF] border-b border-[#e2edf7] text-black">
                <th scope="row" class="px-6 py-4 font-medium text-black dark:text-white whitespace-nowrap border-r border-[#e2edf7]">
                    {_id}
                </th>
                <td class="px-6 py-4 border-r border-[#e2edf7]">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
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
                <td class="px-6 py-4 text-left flex">
                    <button
                        onClick={() => {
                            setUpdateFormToggle(!updateFormToggle)
                            setId(_id)
                        }}
                        class="font-medium border-r-2 border-[#e2edf7] pr-4 text-gray-900 dark:text-blue-500 hover:underline">Edit</button>
                    <button
                        onClick={() => setDeleteBtnToggle(!deleteBtnToggle)}
                        class="pl-4 font-medium text-gray-900 dark:text-blue-500 hover:underline">Delete</button>


                    {/* update form */}
                    <div id="defaultModal" tabindex="-1" aria-hidden="true" class={`${updateFormToggle ? 'block' : 'hidden'} overflow-y-auto overflow-x-hidden fixed bg-[rgba(188,188,188,.8)] top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex shadow-lg justify-center items-center`}>
                        <div class="relative flex justify-center p-4 w-full max-w-2xl h-full md:h-auto">
                            <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">

                                <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Update Bill
                                    </h3>
                                    <button
                                        onClick={() => setUpdateFormToggle(!updateFormToggle)}
                                        type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleBillUpdate}
                                    className='px-3 mt-4 w-3/4 mx-auto'>
                                    <div class="mb-6">
                                        <input
                                            onChange={(e) => setUpName(e.target.value)}
                                            type="text" id="default-input" name='name' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Full Name' value={upName || name} />
                                        <br />
                                        <input
                                            onChange={(e) => setUpEmail(e.target.value)}
                                            type="text" id="default-input" name='email' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Email' value={upEmail || email} />
                                        <br />
                                        <input
                                            onChange={(e) => setUpPhone(e.target.value)}
                                            type="text" id="default-input" name='phone' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Phone' value={upPhone || phone} />
                                        <br />
                                        <input
                                            onChange={(e) => setUpAmount(e.target.value)}
                                            type="text" id="default-input" name='amount' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Paid Amount' value={upAmount || amount} />
                                        <br />
                                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Update</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Delete confimation modal */}
                    <div id="popup-modal" tabindex="-1" class={`${deleteBtnToggle ? 'block' : 'hidden'} bg-[rgba(188,188,188,.8)] flex justify-center overflow-y-auto overflow-x-hidden fixed top-5 right-0 left-0 z-50 md:inset-0 h-modal md:h-full`}>
                        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
                            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button
                                    onClick={() => setDeleteBtnToggle(!deleteBtnToggle)}
                                    type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                </button>
                                <div class="p-6 text-center">
                                    <svg class="mx-auto mb-4 w-14 h-14 text-gray-400 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this bill?</h3>
                                    <button
                                        onClick={handleBillDelete}
                                        data-modal-toggle="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                        Yes, I'm sure
                                    </button>
                                    <button
                                        onClick={() => setDeleteBtnToggle(!deleteBtnToggle)}
                                        data-modal-toggle="popup-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </td>
            </tr>
        </tbody>
    );
};

export default TableSingleRow;