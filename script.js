// Mock data for demonstration
const routes = [
  {
      id: 1,
      type: 'bus',
      origin: 'New York',
      destination: 'Boston',
      date: '2024-11-20',
      time: '10:00',
      price: 45,
      seats: 30
  },
  {
      id: 2,
      type: 'flight',
      origin: 'Los Angeles',
      destination: 'San Francisco',
      date: '2024-11-20',
      time: '14:30',
      price: 199,
      seats: 120
  },
  {
    id: 3,
    type: 'bus',
    origin: 'gorakhpur',
    destination: 'Bareilly',
    date: '2024-11-20',
    time: '14:30',
    price: 199,
    seats: 120
  },
  {
    id: 3,
    type: 'bus',
    origin: 'gorakhpur',
    destination: 'Bareilly Satelite',
    date: '2024-11-20',
    time: '14:30',
    price: 199,
    seats: 120
  },
  // Add more routes as needed
];

// DOM Elements
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');
const bookingModal = document.getElementById('bookingModal');
const searchBtn = document.getElementById('searchBtn');
const searchResults = document.getElementById('searchResults');

// Authentication state
let isAuthenticated = false;
let currentUser = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
  // Check if user is logged in
  const token = localStorage.getItem('token');
  if (token) {
      isAuthenticated = true;
      updateAuthUI();
  }
});

// Modal handlers
const closeModals = () => {
  loginModal.style.display = 'none';
  registerModal.style.display = 'none';
  bookingModal.style.display = 'none';
};

document.querySelectorAll('.close').forEach(closeBtn => {
  closeBtn.addEventListener('click', closeModals);
});

window.addEventListener('click', (e) => {
  if (e.target.classList.contains('modal')) {
      closeModals();
  }
});

// Auth UI Update
const updateAuthUI = () => {
  if (isAuthenticated) {
      loginBtn.classList.add('hidden');
      registerBtn.classList.add('hidden');
      logoutBtn.classList.remove('hidden');
  } else {
      loginBtn.classList.remove('hidden');
      registerBtn.classList.remove('hidden');
      logoutBtn.classList.add('hidden');
  }
};

// Login Handler
loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'block';
});

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Mock login
  isAuthenticated = true;
  localStorage.setItem('token', 'mock-token');
  updateAuthUI();
  closeModals();
});

// Register Handler
registerBtn.addEventListener('click', () => {
  registerModal.style.display = 'block';
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
  e.preventDefault();
  // Mock registration
  alert('Registration successful! Please login.');
  closeModals();
});

// Logout Handler
logoutBtn.addEventListener('click', () => {
  isAuthenticated = false;
  localStorage.removeItem('token');
  updateAuthUI();
});

// Search Handler
searchBtn.addEventListener('click', () => {
  const type = document.getElementById('transportType').value;
  const origin = document.getElementById('origin').value;
  const destination = document.getElementById('destination').value;
  const date = document.getElementById('date').value;

  // Filter routes based on search criteria
  const filteredRoutes = routes.filter(route => 
      (!type || route.type === type) &&
      (!origin || route.origin.toLowerCase().includes(origin.toLowerCase())) &&
      (!destination || route.destination.toLowerCase().includes(destination.toLowerCase())) &&
      (!date || route.date === date)
  );

  displayResults(filteredRoutes);
});

// Display Results
const displayResults = (results) => {
  searchResults.innerHTML = '';
  
  results.forEach(route => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
          <h3>${route.type.toUpperCase()}: ${route.origin} to ${route.destination}</h3>
          <p>Date: ${route.date}</p>
          <p>Time: ${route.time}</p>
          <p>Price: $${route.price}</p>
          <p>Available Seats: ${route.seats}</p>
          <button onclick="handleBooking(${route.id})">Book Now</button>
      `;
      searchResults.appendChild(card);
  });
};

// Booking Handler
const handleBooking = (routeId) => {
  if (!isAuthenticated) {
      alert('Please login to book tickets');
      loginModal.style.display = 'block';
      return;
  }

  const route = routes.find(r => r.id === routeId);
  if (!route) return;

  const bookingDetails = document.getElementById('bookingDetails');
  bookingDetails.innerHTML = `
      <h3>${route.type.toUpperCase()}: ${route.origin} to ${route.destination}</h3>
      <p>Date: ${route.date}</p>
      <p>Time: ${route.time}</p>
      <p>Price: $${route.price}</p>
  `;

  bookingModal.style.display = 'block';
};

// Confirm Booking Handler
document.getElementById('confirmBooking').addEventListener('click', () => {
  const passengerName = document.getElementById('passengerName').value;
  const seatCount = document.getElementById('seatCount').value;

  if (!passengerName) {
      alert('Please enter passenger name');
      return;
  }

  // Mock booking confirmation
  alert(`Booking confirmed!\nPassenger: ${passengerName}\nSeats: ${seatCount}`);
  closeModals();
});

// Initialize search results with all routes
displayResults(routes);