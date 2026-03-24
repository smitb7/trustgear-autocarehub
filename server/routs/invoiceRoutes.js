const express = require('express')
const invoiceRouter = express.Router()

const {getallInvoices, getinvoicebyId, createInvoice, updateInvoice, deleteInvoice} = require('../controllers/invoiceControllers')
const authMiddleware = require("../middlewares/authMiddleware")



invoiceRouter.get("/",authMiddleware, getallInvoices)
invoiceRouter.get("/:id",authMiddleware, getinvoicebyId)
invoiceRouter.post("/",authMiddleware, createInvoice)
invoiceRouter.put("/:id",authMiddleware, updateInvoice)
invoiceRouter.delete("/:id",authMiddleware, deleteInvoice)



module.exports = {invoiceRouter}