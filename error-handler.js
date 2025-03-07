function errorHandler(err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        return res.status(401).json({ message: "The user is not authorized" });
    }
    if (err.name === "ValidationError") {
        return res.status(400).json({ message: err.message });
    }
    
    console.error("Error:", err);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
}


export default errorHandler;