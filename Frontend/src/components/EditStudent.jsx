import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Input, InputNumber, DatePicker, Select, Checkbox, Button, message } from 'antd';
import api from '../services/api';
import dayjs from 'dayjs';

const EditStudent = () => {
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await api.get(`/students/${id}`);
        const student = res.data;

        form.setFieldsValue({
          ...student,
          dob: student.dob ? dayjs(student.dob) : null,
        });
      } catch (error) {
        message.error('Failed to load student data');
      }
    };

    fetchStudent();
  }, [id, form]);

  const onFinish = async (values) => {
    try {
      await api.put(`/students/${id}`, {
        ...values,
        dob: values.dob ? values.dob.toISOString() : null,
      });
      message.success('Student updated successfully');
      navigate('/students');
    } catch (error) {
      message.error('Update failed');
    }
  };

  return (
    <div className="container mx-auto bg-white shadow-md p-8 my-6 rounded-lg">
      <h2 className="text-center text-2xl font-semibold mb-6">Edit Student Details</h2>
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        style={{ maxWidth: '600px', margin: '0 auto' }}
      >
        <Form.Item
          name="studentId"
          label="Student ID"
          rules={[{ required: true, message: 'Please enter student ID' }]}
        >
          <Input className="border-gray-300 p-2 rounded-lg" />
        </Form.Item>

        <Form.Item
          name="firstName"
          label="First Name"
          rules={[{ required: true, message: 'Please enter first name' }]}
        >
          <Input className="border-gray-300 p-2 rounded-lg" />
        </Form.Item>

        <Form.Item
          name="lastName"
          label="Last Name"
          rules={[{ required: true, message: 'Please enter last name' }]}
        >
          <Input className="border-gray-300 p-2 rounded-lg" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: 'email', required: true, message: 'Please enter a valid email' }]}
        >
          <Input className="border-gray-300 p-2 rounded-lg" />
        </Form.Item>

        <Form.Item
          name="dob"
          label="Date of Birth"
          rules={[{ required: true, message: 'Please select date of birth' }]}
        >
          <DatePicker className="w-full border-gray-300 p-2 rounded-lg" />
        </Form.Item>

        <Form.Item
          name="department"
          label="Department"
          rules={[{ required: true, message: 'Please select department' }]}
        >
          <Select className="border-gray-300 p-2 rounded-lg">
            <Select.Option value="CSE">CSE</Select.Option>
            <Select.Option value="ECE">ECE</Select.Option>
            <Select.Option value="EEE">EEE</Select.Option>
            <Select.Option value="IT">IT</Select.Option>
            <Select.Option value="MECH">MECH</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="enrollmentYear"
          label="Enrollment Year"
          rules={[{ required: true, message: 'Please enter enrollment year' }]}
        >
          <InputNumber
            min={2000}
            max={2099}
            className="w-full border-gray-300 p-2 rounded-lg"
          />
        </Form.Item>

        <Form.Item name="isActive" valuePropName="checked">
          <Checkbox className="text-sm">Is Active</Checkbox>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-800 transition duration-300"
          >
            Update Student
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditStudent;
