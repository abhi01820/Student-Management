import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const Home = () => {
  return (
    <div className="container-fluid text-center mt-5 home text-white">
      {/* Updated Headings */}
      <h1 className="text-4xl font-bold mb-4">📚 Welcome to EduTrack</h1>
      
      {/* Updated Description */}
      <p className="text-lg mb-6">Manage your students' information effortlessly in one place. From adding new records to updating existing ones, EduTrack makes it all easy!</p>
      
      {/* Call to Action */}
      <Link to="/students" className="btn btn-lg btn-primary mt-4 px-6 py-3 rounded-full text-xl font-semibold">
        Explore Student Records
      </Link>

      {/* Dashboard */}
      <Dashboard />
    </div>
  );
};

export default Home;
