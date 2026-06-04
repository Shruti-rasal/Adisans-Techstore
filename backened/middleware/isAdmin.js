const isAdmin = (req, res, next) => {
  try {
    console.log("req.role:", JSON.stringify(req.role));

    if (req.role?.toLowerCase().trim() !== "admin") {
      return res.status(403).json({
        message: "Admin access only",
        success: false,
      });
    }

    next();
  } catch (err) {
    console.log(err);
  }
};

export default isAdmin;