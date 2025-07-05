const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const auth = async (req, res, next) => {
  try {
    // Lấy token từ cookie hoặc header
    let token = req.cookies.token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ 
        message: 'Không tìm thấy token xác thực',
        code: 'NO_TOKEN'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Tìm user trong database
      const user = await User.findById(decoded.userId);
      
      if (!user) {
        return res.status(401).json({ 
          message: 'Không tìm thấy người dùng',
          code: 'USER_NOT_FOUND'
        });
      }

      // Thêm user vào request object
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          message: 'Phiên đăng nhập đã hết hạn',
          code: 'TOKEN_EXPIRED'
        });
      }
      throw error;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({ 
      message: 'Xác thực thất bại',
      code: 'AUTH_FAILED'
    });
  }
};

module.exports = { auth }; 