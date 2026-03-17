const express = require('express')
const invoiceRouter = express.Router()

const {getallInvoices, getinvoicebyId, createInvoice, updateInvoice, deleteInvoice} = require('../controllers/invoiceControllers')

invoiceRouter.get("/", getallInvoices)
invoiceRouter.get("/:id", getinvoicebyId)
invoiceRouter.post("/", createInvoice)
invoiceRouter.put("/:id", updateInvoice)
invoiceRouter.delete("/:id", deleteInvoice)



module.exports = {invoiceRouter}