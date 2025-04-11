const isAdmin = (req, res, next) => {
    if (!req.auth || !req.auth.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only!" });
    }
    next();
  };
  
  export default isAdmin;
  