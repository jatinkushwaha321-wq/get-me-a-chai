"use client"
import React from 'react'
import Script from 'next/script'
import { initiate } from '@/actions/useractions'
import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { fetchuser, fetchpayments } from '@/actions/useractions'
import { useSearchParams } from 'next/navigation'
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useRouter } from 'next/navigation'

const Paymentpage = ({ username }) => {
    const [paymentform, setPaymentform] = useState({name: "", message: "", amount: ""})
    const [currentuser, setCurrentuser] = useState({})
    const [payments, setPayments] = useState([])
    const searchParams = useSearchParams()
    const Router = useRouter() 

    useEffect(() => {
        const getData = async () => {
            let u = await fetchuser(username)
            setCurrentuser(u)
            let dbPayments = await fetchpayments(username)
            setPayments(dbPayments)
        }
        getData()
    }, [username])

    useEffect(() => {
        if (searchParams.get("paymentdone") === "true") {
            toast('Thanks for the donation', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        if (searchParams.get("updated") === "true") {
            toast('Profile Updated', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
        Router.push(`/${username}`)
    }, [])



    const handleChange = (e) => {
        setPaymentform({ ...paymentform, [e.target.name]: e.target.value })
    }

    const Pay = async (amount) => {
        let a = await initiate(amount, username, paymentform);
        let orderId = a.id;
        var options = {
            "key": currentuser.razorpayid, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. 
            "currency": "INR",
            "name": "Get Me A Chai", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "+919876543210" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new window.Razorpay(options);

        rzp1.open();
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition={Bounce}
            />
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='cover w-full relative'>
                <img className='object-cover w-full md:h-auto' src={currentuser && currentuser.coverpic ? currentuser.coverpic.replace(/&amp;/g, '&') : "null"} alt="" />
                <div className='absolute -bottom-15 md:right-[46%] right-[38%] border-2 border-white rounded-full size-24 md:size-36 overflow-hidden' >
                    <img className='rounded-full object-cover size-24 md:size-36' height={128} width={128} src={currentuser && currentuser.profilepic ? currentuser.profilepic.replace(/&amp;/g, '&') : "null"} alt="" />
                </div>
            </div>
            <div className="info flex flex-col justify-center items-center my-16 gap-0.5">
                <div className='font-bold text-lg'>
                    @{username}
                </div>
                <div className='text-slate-400'>
                    Let&apos;s help {username} get a chai!
                </div>
                <div className='text-slate-400'>
                    {payments.length} Payments • ₹{payments.reduce((acc, p) => acc + p.amount, 0) / 100} Raised
                </div>
                <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
                    <div className="supporters md:w-1/2 w-full bg-slate-900 text-white p-10 rounded-lg">
                        <h2 className='text-2xl font-bold my-5'>Top 10 Supporters</h2>
                        <ul className='mx-5 text-sm'>
                            {payments.length === 0 && <li className='my-4'>No payments yet</li>}
                            {payments.map((p, i) => {
                                return <li key={i} className='my-4 flex gap-2 items-center'>
                                    <img width={33} src="/avatar.gif" alt="user avatar" />
                                    <span>
                                        {p.name} donated <span className='font-bold'>₹{p.amount / 100}</span> with a message &quot;{p.message}&quot;
                                    </span>
                                </li>
                            })}
                        </ul>
                    </div>
                    <div className="makepayment md:w-1/2 w-full bg-slate-900 text-white p-10 rounded-lg">
                        <h2 className='text-2xl font-bold my-5'>Make a Payment</h2>
                        <div className="flex flex-col gap-2">

                            <input name='name' onChange={handleChange} value={paymentform.name || ""} type="text" className='bg-slate-800 p-3 rounded-lg w-full' placeholder='Enter Name' />
                            <input name='message' onChange={handleChange} value={paymentform.message || ""} type="text" className='bg-slate-800 p-3 rounded-lg w-full' placeholder='Enter Message' />
                            <input name='amount' onChange={handleChange} value={paymentform.amount || ""} type="text" className='bg-slate-800 p-3 rounded-lg w-full' placeholder='Enter Amount' />
                            <button onClick={() => Pay(Number.parseInt(paymentform.amount) * 100)} type="button" className="text-white bg-gradient-to-br from-purple-900 to-blue-900 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2  disabled:from-blue-100" disabled={paymentform.name?.length < 3 || paymentform.message?.length < 4 || paymentform.amount?.length < 1} >Pay</button>
                        </div>
                        <div className="flex mt-5 gap-2 flex-col md:flex-row">
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { Pay(1000) }} >Pay ₹10</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { Pay(2000) }} >Pay ₹20</button>
                            <button className='bg-slate-800 p-3 rounded-lg' onClick={() => { Pay(3000) }} >Pay ₹30</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Paymentpage
