const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
    process.env.VITE_APP_SUPABASE_URL,
    process.env.VITE_APP_ANON_KEY
);

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data) {
      return res.status(401).json({ message: 'Invalid token.' });
    }
    req.user = data.user;
    next();
  } catch (error) {
    res.status(400).json({ message: 'An error occurred while verifying the token.' });
  }
};

module.exports = authMiddleware; 