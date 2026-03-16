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

        res.

    } catch (err) {
        
    }    


}





module.exports = {getallInvoices}