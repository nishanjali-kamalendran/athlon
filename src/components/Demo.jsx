import React, { useState, useEffect } from 'react';
import { 
  Search, MapPin, Clock, Star, Calendar, Users, DollarSign, 
  TrendingUp, BarChart3, Settings, Bell, User, LogOut,
  Plus, Edit, Trash2, Eye, Filter, Download, ChevronDown,
  Activity, Target, Award, CheckCircle, XCircle, AlertCircle
} from 'lucide-react';
import pic1 from '../assets/badminton.jpg';
import pic2 from '../assets/basketball.jpg';
import pic3 from '../assets/football.jpg';


const Demo = () => {
  const [activeView, setActiveView] = useState('customer');
  const [customerTab, setCustomerTab] = useState('search');
  const [vendorTab, setVendorTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Sample data
  const courts = [
    {
      id: 1,
      name: "Elite Tennis Academy",
      type: "Tennis Court",
      location: "Bambalapitiya",
      price: "Rs. 1,200/hour",
      rating: 4.9,
      distance: "0.5 km",
      availability: "Available Now",
      image: pic1,
      amenities: ["Floodlights", "Parking", "Changing Rooms", "Pro Shop"],
      vendor: "Sports Elite Ltd"
    },
    {
      id: 2,
      name: "Metro Basketball Arena",
      type: "Basketball Court",
      location: "Kollupitiya",
      price: "Rs. 800/hour",
      rating: 4.7,
      distance: "1.2 km",
      availability: "Next slot: 6 PM",
      image: pic2,
      amenities: ["Air Conditioning", "Sound System", "Scoreboard"],
      vendor: "Metro Sports"
    },
    {
      id: 3,
      name: "Aqua Badminton Center",
      type: "Badminton Court",
      location: "Wellawatte",
      price: "Rs. 600/hour",
      rating: 4.5,
      distance: "2.1 km",
      availability: "Available Now",
      image: pic3,
      amenities: ["Wooden Flooring", "Equipment Rental", "Cafeteria"],
      vendor: "Aqua Sports Complex"
    }
  ];

  const vendorData = {
    courts: 8,
    totalBookings: 156,
    revenue: "Rs. 2,45,600",
    rating: 4.8,
    recentBookings: [
      { id: 1, customer: "John Perera", court: "Court A", time: "10:00 AM", date: "Today", status: "confirmed" },
      { id: 2, customer: "Sarah Silva", court: "Court B", time: "2:00 PM", date: "Today", status: "pending" },
      { id: 3, customer: "Mike Fernando", court: "Court A", time: "6:00 PM", date: "Tomorrow", status: "confirmed" },
      { id: 4, customer: "Lisa Jayawardena", court: "Court C", time: "4:00 PM", date: "Tomorrow", status: "cancelled" }
    ],
    analytics: {
      weeklyBookings: [12, 18, 15, 22, 19, 25, 21],
      popularTimes: ["6 PM - 8 PM", "10 AM - 12 PM", "8 PM - 10 PM"],
      topCustomers: ["John Perera", "Sarah Silva", "Mike Fernando"]
    }
  };

  const CustomerDashboard = () => (
    <div className="customer-dashboard">
      <div className="demo-tabs">
        <button 
          className={`tab-btn ${customerTab === 'search' ? 'active' : ''}`}
          onClick={() => setCustomerTab('search')}
        >
          Search Courts
        </button>
        <button 
          className={`tab-btn ${customerTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setCustomerTab('bookings')}
        >
          My Bookings
        </button>
        <button 
          className={`tab-btn ${customerTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setCustomerTab('favorites')}
        >
          Favorites
        </button>
      </div>

      {customerTab === 'search' && (
        <div className="search-section">
          <div className="search-header">
            <h2>Find Your Perfect Court</h2>
            <p>Discover and book premium sports facilities near you</p>
          </div>

          <div className="search-bar">
            <div className="search-input-container">
              <Search className="search-icon" />
              <input 
                type="text" 
                placeholder="Search by location, sport, or venue name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="filter-buttons">
              <button className="filter-btn">
                <Filter size={16} />
                Filters
              </button>
              <button className="filter-btn">
                <MapPin size={16} />
                Near Me
              </button>
            </div>
          </div>

          <div className="courts-grid">
            {courts.map(court => (
              <div key={court.id} className="court-card" onClick={() => {
                setSelectedCourt(court);
                setShowModal(true);
              }}>
                <div className="court-image">
                  <img src={court.image} alt={court.name} />
                  <div className="court-badge">{court.type}</div>
                </div>
                <div className="court-info">
                  <h3>{court.name}</h3>
                  <div className="court-meta">
                    <div className="location">
                      <MapPin size={14} />
                      <span>{court.location} • {court.distance}</span>
                    </div>
                    <div className="rating">
                      <Star size={14} />
                      <span>{court.rating}</span>
                    </div>
                  </div>
                  <div className="court-footer">
                    <div className="price">{court.price}</div>
                    <div className={`availability ${court.availability.includes('Available') ? 'available' : 'busy'}`}>
                      <Clock size={12} />
                      {court.availability}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {customerTab === 'bookings' && (
        <div className="bookings-section">
          <h2>My Bookings</h2>
          <div className="booking-filters">
            <button className="filter-active">Upcoming</button>
            <button>Completed</button>
            <button>Cancelled</button>
          </div>
          <div className="bookings-list">
            {[1, 2, 3].map(booking => (
              <div key={booking} className="booking-card">
                <div className="booking-info">
                  <h4>Elite Tennis Academy</h4>
                  <div className="booking-details">
                    <span><Calendar size={14} /> March 20, 2024</span>
                    <span><Clock size={14} /> 6:00 PM - 8:00 PM</span>
                    <span><MapPin size={14} /> Bambalapitiya</span>
                  </div>
                </div>
                <div className="booking-actions">
                  <span className="booking-status confirmed">Confirmed</span>
                  <button className="btn-danger">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {customerTab === 'favorites' && (
        <div className="favorites-section">
          <h2>Favorite Courts</h2>
          <div className="favorites-grid">
            {courts.slice(0, 2).map(court => (
              <div key={court.id} className="favorite-card">
                <img src={court.image} alt={court.name} />
                <div className="favorite-info">
                  <h4>{court.name}</h4>
                  <p>{court.location}</p>
                  <button className="btn-primary">Quick Book</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const VendorDashboard = () => (
    <div className="vendor-dashboard">
      <div className="demo-tabs">
        <button 
          className={`tab-btn ${vendorTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => setVendorTab('dashboard')}
        >
          Dashboard
        </button>
        <button 
          className={`tab-btn ${vendorTab === 'courts' ? 'active' : ''}`}
          onClick={() => setVendorTab('courts')}
        >
          My Courts
        </button>
        <button 
          className={`tab-btn ${vendorTab === 'bookings' ? 'active' : ''}`}
          onClick={() => setVendorTab('bookings')}
        >
          Bookings
        </button>
        <button 
          className={`tab-btn ${vendorTab === 'analytics' ? 'active' : ''}`}
          onClick={() => setVendorTab('analytics')}
        >
          Analytics
        </button>
      </div>

      {vendorTab === 'dashboard' && (
        <div className="vendor-overview">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <Target className="icon" />
              </div>
              <div className="stat-info">
                <h3>{vendorData.courts}</h3>
                <p>Active Courts</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Users className="icon" />
              </div>
              <div className="stat-info">
                <h3>{vendorData.totalBookings}</h3>
                <p>Total Bookings</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <DollarSign className="icon" />
              </div>
              <div className="stat-info">
                <h3>{vendorData.revenue}</h3>
                <p>Monthly Revenue</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Star className="icon" />
              </div>
              <div className="stat-info">
                <h3>{vendorData.rating}</h3>
                <p>Average Rating</p>
              </div>
            </div>
          </div>

          <div className="dashboard-content">
            <div className="recent-bookings">
              <h3>Recent Bookings</h3>
              <div className="bookings-table">
                {vendorData.recentBookings.map(booking => (
                  <div key={booking.id} className="booking-row">
                    <div className="customer-info">
                      <User size={16} />
                      <span>{booking.customer}</span>
                    </div>
                    <div className="booking-details">
                      <span>{booking.court}</span>
                      <span>{booking.time}</span>
                      <span>{booking.date}</span>
                    </div>
                    <div className={`status ${booking.status}`}>
                      {booking.status === 'confirmed' && <CheckCircle size={14} />}
                      {booking.status === 'pending' && <AlertCircle size={14} />}
                      {booking.status === 'cancelled' && <XCircle size={14} />}
                      {booking.status}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="quick-actions">
              <h3>Quick Actions</h3>
              <div className="action-buttons">
                <button className="action-btn">
                  <Plus size={16} />
                  Add New Court
                </button>
                <button className="action-btn">
                  <Calendar size={16} />
                  View Schedule
                </button>
                <button className="action-btn">
                  <Settings size={16} />
                  Court Settings
                </button>
                <button className="action-btn">
                  <Download size={16} />
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {vendorTab === 'courts' && (
        <div className="courts-management">
          <div className="section-header">
            <h2>My Courts</h2>
            <button className="btn-primary">
              <Plus size={16} />
              Add New Court
            </button>
          </div>
          <div className="courts-table">
            {[
              { id: 1, name: "Court 1", type: "Tennis Court", image: pic1 },
              { id: 2, name: "Court 2", type: "Basketball Court", image: pic2 },
              { id: 3, name: "Court 3", type: "Football Court", image: pic3 },
              { id: 4, name: "Court 4", type: "Tennis Court", image: pic1 }
            ].map(court => (
              <div key={court.id} className="court-row">
                <div className="court-basic">
                  <img src={court.image} alt={court.name} />
                  <div>
                    <h4>{court.name}</h4>
                    <p>{court.type} • Indoor</p>
                  </div>
                </div>
                <div className="court-stats">
                  <span>Rs. 1,200/hour</span>
                  <span className="status active">Active</span>
                </div>
                <div className="court-actions">
                  <button className="action-icon">
                    <Eye size={16} />
                  </button>
                  <button className="action-icon">
                    <Edit size={16} />
                  </button>
                  <button className="action-icon">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {vendorTab === 'bookings' && (
        <div className="bookings-management">
          <h2>Booking Management</h2>
          <div className="booking-filters">
            <button className="filter-active">All</button>
            <button>Today</button>
            <button>This Week</button>
            <button>Pending</button>
          </div>
          <div className="bookings-table">
            {vendorData.recentBookings.map(booking => (
              <div key={booking.id} className="booking-management-row">
                <div className="booking-customer">
                  <User size={20} />
                  <div>
                    <h4>{booking.customer}</h4>
                    <p>Customer ID: #12{booking.id}45</p>
                  </div>
                </div>
                <div className="booking-details">
                  <div>
                    <strong>{booking.court}</strong>
                    <p>{booking.date} at {booking.time}</p>
                  </div>
                </div>
                <div className="booking-amount">
                  <strong>Rs. 1,200</strong>
                  <p>2 hours</p>
                </div>
                <div className={`booking-status ${booking.status}`}>
                  {booking.status}
                </div>
                <div className="booking-actions">
                  <button className="btn-approve">Approve</button>
                  <button className="btn-reject">Reject</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {vendorTab === 'analytics' && (
        <div className="analytics-section">
          <h2>Analytics & Insights</h2>
          <div className="analytics-grid">
            <div className="chart-card">
              <h3>Weekly Bookings</h3>
              <div className="chart-placeholder">
                <BarChart3 size={48} />
                <p>Booking trends chart</p>
              </div>
            </div>
            <div className="insights-card">
              <h3>Popular Time Slots</h3>
              <div className="insights-list">
                {vendorData.analytics.popularTimes.map((time, index) => (
                  <div key={index} className="insight-item">
                    <span>{time}</span>
                    <div className="progress-bar">
                      <div className="progress" style={{width: `${90 - index * 20}%`}}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="top-customers-card">
              <h3>Top Customers</h3>
              <div className="customers-list">
                {vendorData.analytics.topCustomers.map((customer, index) => (
                  <div key={index} className="customer-item">
                    <User size={16} />
                    <span>{customer}</span>
                    <span className="bookings-count">{15 - index * 3} bookings</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const CourtModal = () => (
    <div className="modal-overlay" onClick={() => setShowModal(false)}>
      <div className="court-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
        <div className="modal-content">
          <div className="modal-image">
            <img src={selectedCourt?.image} alt={selectedCourt?.name} />
          </div>
          <div className="modal-info">
            <h2>{selectedCourt?.name}</h2>
            <div className="modal-meta">
              <div className="rating">
                <Star size={16} />
                <span>{selectedCourt?.rating}</span>
              </div>
              <div className="location">
                <MapPin size={16} />
                <span>{selectedCourt?.location}</span>
              </div>
            </div>
            <div className="price-section">
              <span className="price">{selectedCourt?.price}</span>
              <span className="availability">{selectedCourt?.availability}</span>
            </div>
            <div className="amenities">
              <h4>Amenities</h4>
              <div className="amenities-list">
                {selectedCourt?.amenities?.map((amenity, index) => (
                  <span key={index} className="amenity-tag">{amenity}</span>
                ))}
              </div>
            </div>
            <button className="book-now-btn">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="demo-container">
      <div className="demo-header">
        <h1>ATHLON Platform Demo</h1>
        <div className="view-switcher">
          <button 
            className={`view-btn ${activeView === 'customer' ? 'active' : ''}`}
            onClick={() => setActiveView('customer')}
          >
            <User size={16} />
            Customer View
          </button>
          <button 
            className={`view-btn ${activeView === 'vendor' ? 'active' : ''}`}
            onClick={() => setActiveView('vendor')}
          >
            <Award size={16} />
            Vendor View
          </button>
        </div>
      </div>

      <div className="demo-content">
        {activeView === 'customer' ? <CustomerDashboard /> : <VendorDashboard />}
      </div>

      {showModal && selectedCourt && <CourtModal />}
    </div>
  );
};

export default Demo;

