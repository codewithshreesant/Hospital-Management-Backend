
import jwt from 'jsonwebtoken'

export const verifyToken = (req, res, next) => {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1];
    console.log("token ", token);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded token ", decoded)
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: error.message });
    }
}