import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, DatePicker, Form, Input, InputNumber, Select, Switch, message } from 'antd';
import api from '../services/api';
import '../App.css';

const { Option } = Select;

const AddStudent = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const studentIdRef = useRef(null);
  const emailRef = useRef(null);

  const onFinish = async (values) => {
    const formattedValues = {
      ...values,
      dob: values.dob.format('YYYY-MM-DD'),
    };

    try {
      await api.post('/', formattedValues);
      message.success('🎉 Student added successfully!');
      navigate('/students');
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.message
      ) {
        const errorMsg = error.response.data.message;
        let fieldsWithErrors = [];

        if (errorMsg.includes('Student with this ID')) {
          fieldsWithErrors.push({
            name: 'studentId',
            errors: ['Student ID already exists.'],
          });
        }

        if (errorMsg.includes('Email')) {
          fieldsWithErrors.push({
            name: 'email',
            errors: ['Email already exists.'],
          });
        }

        form.setFields(fieldsWithErrors);

        if (fieldsWithErrors.some((field) => field.name === 'studentId')) {
          studentIdRef.current?.focus();
        } else if (fieldsWithErrors.some((field) => field.name === 'email')) {
          emailRef.current?.focus();
        }
      } else {
        message.error('Failed to add student 😓');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-800 to-indigo-900 px-4 py-10">
      <div className="bg-white/10 backdrop-blur-md shadow-2xl rounded-3xl p-8 w-full max-w-4xl">
        <h2 className="text-3xl font-bold text-white text-center mb-8">🎓 Add New Student</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          className="space-y-6"
        >
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label={<span className="text-white">Student ID</span>}
              name="studentId"
              rules={[{ required: true, message: 'Please enter Student ID' }]}
            >
              <Input
                ref={studentIdRef}
                className="rounded-lg bg-white/90 text-black placeholder-gray-600 border border-white/30"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">First Name</span>}
              name="firstName"
              rules={[{ required: true, message: 'Please enter first name' }]}
            >
              <Input className="rounded-lg bg-white/90 text-black placeholder-gray-600 border border-white/30" />
            </Form.Item>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label={<span className="text-white">Last Name</span>}
              name="lastName"
              rules={[{ required: true, message: 'Please enter last name' }]}
            >
              <Input className="rounded-lg bg-white/90 text-black placeholder-gray-600 border border-white/30" />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Email-id</span>}
              name="email"
              rules={[
                { required: true, message: 'Please enter email' },
                { type: 'email', message: 'Invalid email format' },
              ]}
            >
              <Input
                ref={emailRef}
                className="rounded-lg bg-white/90 text-black placeholder-gray-600 border border-white/30"
              />
            </Form.Item>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label={<span className="text-white">Date of Birth</span>}
              name="dob"
              rules={[{ required: true, message: 'Please select DOB' }]}
            >
              <DatePicker
                className="w-full rounded-lg bg-white/90 text-black border border-white/30"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Department</span>}
              name="department"
              rules={[{ required: true, message: 'Please select department' }]}
            >
              <Select
                placeholder="Select Department"
                className="rounded-lg bg-white/90 text-black border border-white/30"
              >
                <Option value="Computer Science">Computer Science</Option>
                <Option value="Electronics">Electronics</Option>
                <Option value="Mechanical">Mechanical</Option>
                <Option value="Civil">Civil</Option>
                <Option value="IT">IT</Option>
              </Select>
            </Form.Item>
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              label={<span className="text-white">Enrollment Year</span>}
              name="enrollmentYear"
              rules={[{ required: true, message: 'Please enter enrollment year' }]}
            >
              <InputNumber
                min={2000}
                max={2099}
                className="w-full rounded-lg bg-white/90 text-black border border-white/30"
              />
            </Form.Item>

            <Form.Item
              label={<span className="text-white">Is Active</span>}
              name="isActive"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch className="bg-indigo-500" />
            </Form.Item>
          </div>

          {/* Submit */}
          <Form.Item className="text-center mt-6">
            <Button
              type="primary"
              htmlType="submit"
              className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 text-white rounded-full shadow-lg transition"
            >
              ➕ Add Student
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AddStudent;
