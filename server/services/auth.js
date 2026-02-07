const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function verifyPassword(password, hash) {
  return await bcrypt.compare(password, hash);
}

function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '30d' });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

function signup(email, password) {
  return new Promise(async (resolve, reject) => {
    try {
      const hashedPassword = await hashPassword(password);
      
      db.run(
        'INSERT INTO users (email, password, credits) VALUES (?, ?, ?)',
        [email, hashedPassword, 3], // Free tier gets 3 credits
        function(err) {
          if (err) {
            if (err.message.includes('UNIQUE')) {
              reject(new Error('Email already exists'));
            } else {
              reject(err);
            }
          } else {
            const token = generateToken(this.lastID);
            resolve({ id: this.lastID, email, token });
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}

function login(email, password) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT * FROM users WHERE email = ?',
      [email],
      async (err, user) => {
        if (err) return reject(err);
        if (!user) return reject(new Error('User not found'));

        const validPassword = await verifyPassword(password, user.password);
        if (!validPassword) return reject(new Error('Invalid password'));

        const token = generateToken(user.id);
        resolve({ id: user.id, email: user.email, token, credits: user.credits });
      }
    );
  });
}

function getUser(userId) {
  return new Promise((resolve, reject) => {
    db.get(
      'SELECT id, email, credits FROM users WHERE id = ?',
      [userId],
      (err, user) => {
        if (err) return reject(err);
        resolve(user || null);
      }
    );
  });
}

module.exports = {
  signup,
  login,
  getUser,
  generateToken,
  verifyToken,
  hashPassword,
  verifyPassword
};
