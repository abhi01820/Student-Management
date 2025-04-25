import React, { useState } from 'react';
import {
  MenuOutlined,
  HomeOutlined,
  UserAddOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Button, Drawer, Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import CustomButton from './CustomButton';
import '../App.css';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const showDrawer = () => setOpen(true);
  const onClose = () => setOpen(false);

  const menuItems = [
    {
      key: '/',
      label: 'Home',
      icon: <HomeOutlined />,
      path: '/',
      bgColor: 'from-pink-500 to-purple-600',
    },
    {
      key: '/students/add',
      label: 'Add Student',
      icon: <UserAddOutlined />,
      path: '/students/add',
      bgColor: 'from-green-400 to-teal-500',
    },
    {
      key: '/students',
      label: 'Student List',
      icon: <UnorderedListOutlined />,
      path: '/students',
      bgColor: 'from-yellow-400 to-orange-500',
    },
  ];

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-2xl sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center text-3xl text-black font-extrabold tracking-wider gap-3 hover:opacity-90 transition-all"
        >
          <span role="img" aria-label="logo">🚀</span>
          <span>EduTrack</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-5">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.key}
                to={item.path}
                className={`px-5 py-2 text-base font-semibold rounded-full transition-all duration-300 shadow-md ${
                  isActive
                    ? `bg-white text-blue-700 scale-105`
                    : `bg-gradient-to-r ${item.bgColor} hover:opacity-90`
                } flex items-center gap-2`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Custom Add Button for mobile */}
        <div className="lg:hidden">
          <CustomButton
            text="Add Student"
            to="/students/add"
            icon={<UserAddOutlined />}
          />
        </div>

        {/* Hamburger Icon */}
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: 28, color: 'white' }} />}
          className="lg:hidden"
          onClick={showDrawer}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title={
          <div className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
            📘 EduTrack
          </div>
        }
        placement="right"
        onClose={onClose}
        open={open}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="vertical"
          selectedKeys={[location.pathname]}
          onClick={onClose}
          className="text-lg font-semibold"
        >
          {menuItems.map((item) => (
            <Menu.Item
              key={item.path}
              icon={item.icon}
              className="py-3 px-4"
            >
              <Link to={item.path}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Drawer>
    </header>
  );
};

export default Navbar;
