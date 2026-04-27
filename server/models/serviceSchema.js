const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  serviceName: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
