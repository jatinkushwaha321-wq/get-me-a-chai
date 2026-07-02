"use server"
import razorpay from "razorpay";
import Payment from "@/models/Payment"
import connectDB from "@/db/connectDb";
import User from "@/models/User";   
export const initiate = async (amount, to_username, paymentform) => {
    await connectDB()
    let user = await User.findOne({username: to_username});
    const secret = user.razorpaysecret;
    var instance = new razorpay({
        key_id: user.razorpayid,
        key_secret: secret
    })
    
    let options = {
        amount: Number.parseInt(amount),
        currency: "INR",}
        let x = await instance.orders.create(options)
        await Payment.create({oid: x.id, name: paymentform.name, to_user: to_username, message: paymentform.message, amount: amount})

        return x
}

export const fetchuser = async (username) => {
    await connectDB()
    let u = await User.findOne({username: username})
    if (!u) return null
    let user = u.toObject({flattenObjects: true})
    user._id = user._id.toString()
    if (user.createdAt) user.createdAt = user.createdAt.toString()
    if (user.updatedAt) user.updatedAt = user.updatedAt.toString()
    return user
}
export const fetchpayments = async (username) => {
    await connectDB()
    let p = await Payment.find({to_user: username, done: true}).sort({amount: -1}).limit(10).lean()
    return p.map(payment => ({
        ...payment,
        _id: payment._id.toString(),
        createdAt: payment.createdAt.toString(),
        updatedAt: payment.updatedAt.toString()
    }))
}

export const updateProfile = async (data, oldusername) => {
    await connectDB()
    let ndata = Object.fromEntries(data)

    if(oldusername !== ndata.username){
        let u = await User.findOne({username: ndata.username})
        if(u) return {error: "Username already exists"}
    }

    await User.updateOne({email: ndata.email}, ndata)
}