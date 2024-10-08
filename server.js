// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv'); // Import dotenv to load environment variables

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const port = 3002;

// Set view engine to EJS
app.set('view engine', 'ejs');

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB Atlas connection setup using .env variable
mongoose.connect(process.env.SWEETHUB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('MongoDB connected successfully');
});

// Static directories
const imgDirectoryPath = path.join(__dirname, 'public', 'img');
app.use('/img', express.static(imgDirectoryPath));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
const signupRoute = require('./routes/signup');
const loginRoute = require('./routes/login');
const resetPasswordRoute = require('./routes/reset'); // Ensure this path is correct
const resetRequestRoute = require('./routes/reset-request'); // Assuming you have this route file
const itemsRoute = require('./routes/items'); // New items route
const favoritesRoutes = require('./routes/favorites');
const userProfileImageRoutes = require('./routes/userProfileImage'); // Adjust path as needed
const cartRoutes = require('./routes/cart'); // Adjust path if needed
const customerRoutes = require('./routes/customer'); // Adjust path if needed
const paypalRoutes = require('./paypal/paypalRoutes');
const orderRoutes = require('./routes/order');
const customersRoutes = require('./routes/customerRoutes'); // Adjust path if needed
const orderMobileRoutes = require('./routes/orderMobile');

// Use routes
app.use('/signup', signupRoute);
app.use('/login', loginRoute);
app.use('/reset', resetPasswordRoute); // Use resetPasswordRoute for resetting password
app.use('/reset-password', resetRequestRoute); // Use resetRequestRoute for requesting password reset
app.use('/items', itemsRoute); // Mount items route
app.use('/api/favorites', favoritesRoutes);
app.use('/api/userProfileImage', userProfileImageRoutes); // If your routes are prefixed with /api
app.use('/cart', cartRoutes);
app.use('/customer', customerRoutes);
app.use('/paypal', paypalRoutes); // Use PayPal routes
app.use('/api', orderRoutes); // Mount the order routes on `/api`
app.use('/customers', customersRoutes);
app.use('/api/orders/mobile', orderMobileRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
