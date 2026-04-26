// const Razorpay = require("razorpay");
// const Payments = require("../models/paymentSchema");
// const Appointments = require("../models/appointmentsSchema");

// console.log("KEY:", process.env.RAZORPAY_KEY_ID);
// // razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // 🔥 CREATE ORDER (LIKE createAppointment)
// const createPaymentOrder = async (req, res) => {
//   try {
//     const { appointmentId, amount } = req.body;

//     const order = await razorpay.orders.create({
//       amount: amount * 100,
//       currency: "INR",
//       receipt: "receipt_" + Date.now(),
//     });

//     const paymentData = await Payments.create({
//       userId: req.user.id,
//       appointmentId: appointmentId,
//       amount: amount,
//       razorpayOrderId: order.id,
//       status: "Pending",
//     });

//     res.status(201).send({
//       data: { order, paymentData },
//       message: "Payment order created",
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Payment server Down...!");
//   }
// };

// // 🔥 VERIFY PAYMENT (LIKE updateAppointment)
// const verifyPayment = async (req, res) => {
//   try {
//     const { orderId, paymentId, appointmentId } = req.body;

//     await Payments.findOneAndUpdate(
//       { razorpayOrderId: orderId },
//       {
//         razorpayPaymentId: paymentId,
//         status: "Paid",
//       }
//     );

//     await Appointments.findByIdAndUpdate(appointmentId, {
//       status: "Completed", // or "Paid" if you want new status
//     });

//     res.status(200).send({
      
//       message: "Payment successful",
//     });

//   } catch (err) {
//     console.log(err);
//     res.status(500).send("Payment verification failed");
//   }
// };

// module.exports = {
//   createPaymentOrder,
//   verifyPayment,
// };



const Razorpay = require("razorpay");
const crypto = require("crypto");
const Payment = require("../models/paymentSchema");
const Appointments = require("../models/appointmentsSchema");
const Service = require("../models/serviceSchema");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});


const createOrder = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    // 1. Get appointment
    const appointment = await Appointments.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // 2. Get service
    const service = await Service.findById(appointment.serviceId);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // 3. Get price
    const amount = service.price;

    // 4. Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });

    // 5. Save payment in DB
    const paymentData = await Payment.create({
      userId: req.user.id,
      appointmentId,
      amount,
      razorpayOrderId: order.id,
      status: "Pending",
    });

    res.status(200).json({
      data: {
        order,
        paymentData,
      },
      message: "Payment order created",
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};