const errorHandler = (err, req, res, next) => {
    console.error("🔴 Error caught:", err);
  
    if (!res || typeof res.status !== "function") {
      console.error("Response object is undefined or malformed");
      return;
    }
  
    if (!err) {
      return res.status(500).json({ message: "Unknown Error on the server" });
    }
  
    if (err.name === "UnauthorizedError") {
      return res.status(401).json({ message: "The user is not authorized" });
    }
  
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
  
    return res.status(500).json({ 
      message: "Server internal error", 
      error: err.message || "Error without specific message" 
    });
  };
  
  export default errorHandler;
  