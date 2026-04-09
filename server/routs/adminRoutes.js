router.get("/dashboard-stats", adminAuthMiddleware, async (req, res) => {
    try {
      const totalAppointments = await Appointment.countDocuments();
      const pendingAppointments = await Appointment.countDocuments({ status: "pending" });
      const completedAppointments = await Appointment.countDocuments({ status: "completed" });
      const totalUsers = await User.countDocuments();
  
      res.json({
        success: true,
        data: {
          totalAppointments,
          pendingAppointments,
          completedAppointments,
          totalUsers,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: "Server error" });
    }
  });