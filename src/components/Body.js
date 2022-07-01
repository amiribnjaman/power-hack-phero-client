import React, { useState, useEffect } from 'react';
import TableSingleRow from './TableSingleRow'

const Body = ({setTotalPaid, setReRender, reRender}) => {
    const [toggleAddBillBtn, setToggleAddBillBtn] = useState(false)
    const [bills, setBills] = useState([])


    useEffect(() => {
        fetch('http://localhost:5000/api/billing-list')
            .then(res => res.json())
            .then(data => {
                setBills(data.result)
                setTotalPaid(data.count)
            })
    }, [reRender, setTotalPaid])

    const handleAddBillForm = e => {
        e.preventDefault()
        const name = e.target.name.value
        const email = e.target.email.value
        const phone = e.target.phone.value
        const amount = e.target.amount.value

        const body = {
            name,
            email,
            phone,
            amount
        }
        if (name && email && phone && amount) {
            fetch('http://localhost:5000/api/add-billing', {
                method: 'POST',
                headers: {
                    'authorization': 'Bearer ' + localStorage.getItem('accessToken'),
                    'content-type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            .then(res => res.json())
            .then(data => {
                setReRender(!reRender)
                setToggleAddBillBtn(!toggleAddBillBtn)
            })
        }
        e.target.reset()
    }

    return (
        <div className='w-9/12 mx-auto my-10'>
            <div className='px-6 mb-8 items-center top-bar bg-[#F0F8FF] shadow-lg py-1.5 flex justify-between'>
                <div className='flex justify-between w-1/4'>
                    <h6 className='mt-1 font-semibold'>Billings</h6>
                    <input type="search" id="default-search" class="h-[35px] bg-[#F0F8FF] border-[1.5px] border-[#e2edf7] px-12 ml-14 py-0 pl-6 text-sm text-gray-900 focus:ring-blue-500" placeholder="Search" required />
                </div>
                <div>
                    <button
                        onClick={() => setToggleAddBillBtn(!toggleAddBillBtn)}
                        type="button" class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none rounded focus:ring-4 focus:ring-gray-300 font-medium text-sm px-5 py-2.5 mr-2">Add New Bill</button>

                    <div id="defaultModal" tabindex="-1" aria-hidden="true" class={`${toggleAddBillBtn ? 'block' : 'hidden'} overflow-y-auto overflow-x-hidden fixed bg-[rgba(188,188,188,.8)] top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full flex shadow-lg justify-center items-center`}>
                        <div class="relative flex justify-center p-4 w-full max-w-2xl h-full md:h-auto">
                            <div class="relative w-full bg-white rounded-lg shadow dark:bg-gray-700">

                                <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                                    <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                        Add new Bill
                                    </h3>
                                    <button
                                        onClick={() => setToggleAddBillBtn(!toggleAddBillBtn)}
                                        type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                                    </button>
                                </div>

                                <form
                                    onSubmit={handleAddBillForm}
                                    className='px-3 mt-4 w-3/4 mx-auto'>
                                    <div class="mb-6">
                                        <input type="text" id="default-input" name='name' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Full Name' />
                                        <br />
                                        <input type="text" id="default-input" name='email' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Email' />
                                        <br />
                                        <input type="text" id="default-input" name='phone' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Phone' />
                                        <br />
                                        <input type="text" id="default-input" name='amount' class="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder='Paid Amount' />
                                        <br />
                                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            {/* body */}

            <div class="relative overflow-x-auto shadow-lg">
                <table class="w-full text-sm text-left text-gray-500">
                    <thead class="text-xs text-gray-700 uppercase">
                        <tr className='bg-[#F0F8FF] border-b border-[#e2edf7]'>
                            <th scope="col" class="px-6 py-3 border-r border-[#e2edf7]">
                                Billing ID
                            </th>
                            <th scope="col" class="px-6 py-3 border-r border-[#e2edf7]">
                                Full Name
                            </th>
                            <th scope="col" class="px-6 py-3 border-r border-[#e2edf7]">
                                Email
                            </th>
                            <th scope="col" class="px-6 py-3 border-r border-[#e2edf7]">
                                Phone
                            </th>
                            <th scope="col" class="px-6 py-3 border-r border-[#e2edf7]">
                                Paid Amount
                            </th>
                            <th scope="col" class="px-6 py-3">
                                Action
                            </th>
                        </tr>
                    </thead>
                    {bills.map((bill, key) => <TableSingleRow
                        key={key}
                        bill={bill}
                        reRender={reRender}
                        setReRender={setReRender}
                    />)}
                </table>
            </div>

        </div>
    );
};

export default Body;