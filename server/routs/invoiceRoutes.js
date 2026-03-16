const express = require('express')
const invoiceRouter = express.Router()

const {getallInvoices} = require('../controllers/invoiceControllers')

invoiceRouter.get("/", getallInvoices)



module.exports = {invoiceRouter}