const express = require('express')
const invoiceRouter = express.Router()

const {getallInvoices, getinvoicebyId, createInvoice} = require('../controllers/invoiceControllers')

invoiceRouter.get("/", getallInvoices)
invoiceRouter.get("/:id", getinvoicebyId)
invoiceRouter.post("/", createInvoice)



module.exports = {invoiceRouter}