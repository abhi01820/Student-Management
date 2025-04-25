import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Statistic } from 'antd';
import api from '../services/api';
import '../App.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const Dashboard = () => {
  const [data, setData] = useState({
    total: 0,
    active: 0,
    departments: {}
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get('/dashboard');
      setData(res.data);
    };
    fetchData();
  }, []);

  
  const departmentChartData = Object.entries(data.departments).map(([name, values]) => ({
    name,
    active: values.active,
    total: values.total,
  }));

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-fuchsia-500 via-red-400 to-amber-300">
      {/* Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={8}>
          <Card className="bg-gradient-to-tr from-indigo-400 via-purple-500 to-pink-400 text-white shadow-2xl">
            <Statistic
              title="Departments"
              value={Object.keys(data.departments).length}
              valueStyle={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card className="bg-gradient-to-tr from-cyan-500 to-blue-500 text-white shadow-2xl">
            <Statistic
              title="Active Students"
              value={data.active}
              valueStyle={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={24} md={8}>
          <Card className="bg-gradient-to-tr from-lime-400 to-green-500 text-white shadow-2xl">
            <Statistic
              title="Total Students"
              value={data.total}
              valueStyle={{ fontSize: '2rem', fontWeight: 'bold', color: 'black' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Image Section */}
      <Row justify="center" className="mb-6">
        <Col xs={24} sm={20} md={16}>
          <img
            src="https://wallpapers.com/images/hd/college-graduation-pictures-bkjadfrg7up3uydl.jpg" // <-- Replace with your image URL or import
            alt="Dashboard Overview"
            className="w-full h-auto rounded-2xl shadow-xl border border-white"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
