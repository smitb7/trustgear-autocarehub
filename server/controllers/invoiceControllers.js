const express = require("express")
const mongoose = require("mongoose")

const User = require("../models/invoiceSchema")





// get - Get all invoices
const getallInvoices = async(req,res)=>{

    try {

        const getallinvoiceData = await User.find()

        res.status(200).json({
        data : getallinvoiceData,
        message : "Yes...here's your all invoices..!"})

    } catch (err) {


        res.status(500).send("Invoice Server is Down..!")


    }

}

// get invoices by there ID's 

const getinvoicebyId = async(req,res)=>{

    const {
        id
    } = req.params

    try {

        const getinvoicesbyId = await User.findById(id)

        res.status(200).json({
            
            data : getinvoicesbyId,
            message : "This is your data according to your..!" 
        })

    } catch (err) {

        res.status(500).send("Invoice Server is Down..!")

    }    


}



// now create invoice

const createInvoice = async(req,res)=>{

            try {

                const {
                    invoiceId,
                    appointmentId,
                    amount,
                    serviceDetails,
                    paymentStatus
                } = req.body


                const createData = await User.create({
                    invoiceId : invoiceId,
                    appointmentId : appointmentId,
                    amount : amount,
                    serviceDetails : serviceDetails,
                    paymentStatus : paymentStatus
                })


                res.status(201).json({
                    data : createData,
                    message : "Your data is successfully created...!"
                })

            } catch (err) {

                res.status(500).send("Invoice Server is Down..!")
                
            }

        }


// update API 


const updateInvoice = async(req,res)=>{


    try {
        
        const {
            id
        } = req.params

        const {
            invoiceId,
            appointmentId,
            amount,
            serviceDetails,
            paymentStatus

        } = req.body 
        
        const updateData = await User.findByIdAndUpdate(id,
            {
                invoiceId : invoiceId,
                appointmentId : appointmentId,
                amount : amount,
                serviceDetails : serviceDetails,
                paymentStatus : paymentStatus
            }
        )

        res.status(201).json({
            data : updateData,
            message : " Your Data is successfully updated..!" 
        })

    } catch (err) {

        res.status(500).send("Invoice Server is Down..!")

    }

}

// delete API for invoice 



const deleteInvoice = async(req,res)=>{

    try {
        
        const {
            id
        } = req.params

        const deleteinvoiceData = await User.findByIdAndDelete(id)

        res.status(200).json({
            data : deleteinvoiceData,
            message : "Your data is deleted successfully..!"
        })


    } catch (err) { 

        res.status(500).send("Invoice Server is Down..!")
        
    }

}










module.exports = {getallInvoices, getinvoicebyId, createInvoice, updateInvoice , deleteInvoice}