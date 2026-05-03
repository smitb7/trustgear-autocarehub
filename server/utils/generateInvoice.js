const PDFDocument = require("pdfkit");

const generateInvoice = (invoice, appointment, user, res) => {
  try {
    const doc = new PDFDocument({ margin: 50 });

    // HEADERS
    res.status(200);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice_${invoice._id}.pdf`
    );

    //  STREAM
    doc.pipe(res);

    // HEADER 
    doc
      .fontSize(22)
      .fillColor("#2563eb")
      .text("TrustGear AutoCareHub", { align: "left" });

    doc
      .fontSize(10)
      .fillColor("#555")
      .text("Ahmedabad, Gujarat, India")
      .text("support@autocarehub.com")
      .moveDown();

    // TITLE 
    doc
      .fontSize(20)
      .fillColor("#000")
      .text("INVOICE", { align: "right" });

    doc.moveDown();

    //INVOICE INFO
    doc
      .fontSize(10)
      .text(`Invoice ID: ${invoice._id}`, { align: "right" })
      .text(
        `Date: ${new Date(invoice.createdAt).toLocaleDateString()}`,
        { align: "right" }
      )
      .moveDown(2);

    // BILL TO 
    doc
      .fontSize(12)
      .text("Bill To:")
      .fontSize(10)
      .text(user?.name || "Customer")
      .text(user?.email || "N/A")
      .moveDown();

    // LINE 
    doc
      .moveTo(50, doc.y)
      .lineTo(550, doc.y)
      .strokeColor("#cccccc")
      .stroke()
      .moveDown();

    //TABLE HEADER 
    const tableTop = doc.y;

    doc
      .fontSize(11)
      .fillColor("#000")
      .text("Service", 50, tableTop)
      .text("Garage", 200, tableTop)
      .text("Date", 350, tableTop)
      .text("Amount", 470, tableTop);

    doc
      .moveTo(50, tableTop + 15)
      .lineTo(550, tableTop + 15)
      .stroke();

    // TABLE DATA 
    const y = tableTop + 25;

    doc
      .fontSize(10)
      .text(
        appointment?.serviceId?.serviceName || "Service",
        50,
        y
      )
      .text(
        appointment?.garageId?.name || "Garage",
        200,
        y
      )
      .text(
        appointment?.appointmentDate
          ? new Date(appointment.appointmentDate).toLocaleDateString()
          : "N/A",
        350,
        y
      )
      .text(`₹${invoice.amount}`, 470, y);

    // LINE 
    doc
      .moveTo(50, y + 20)
      .lineTo(550, y + 20)
      .stroke();

    // TOTAL
    const totalY = y + 40;

    doc
      .fontSize(12)
      .text("Subtotal:", 400, totalY)
      .text(`₹${invoice.amount}`, 470, totalY);

    doc
      .text("Tax (0%):", 400, totalY + 20)
      .text("₹0", 470, totalY + 20);

    doc
      .fontSize(14)
      .fillColor("#000")
      .text("Total:", 400, totalY + 50)
      .text(`₹${invoice.amount}`, 470, totalY + 50);

    // FOOTER 
    doc
      .fontSize(10)
      .fillColor("#666")
      .text(
        "Thank you for choosing AutoCareHub!",
        50,
        720,
        {
          align: "center",
          width: 500,
        }
      );

    // ✅ END
    doc.end();

  } catch (err) {
    console.log("PDF GENERATION ERROR:", err);
    res.status(500).send("PDF generation failed");
  }
};

module.exports = generateInvoice;