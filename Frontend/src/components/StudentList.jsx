import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import api from '../services/api';
import 'react-toastify/dist/ReactToastify.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 5;

  const fetchStudents = async () => {
    try {
      const res = await api.get('/');
      setStudents(res.data);
    } catch (error) {
      toast.error('Failed to fetch students');
    }
  };

  const deleteStudent = async (id) => {
    if (!window.confirm('Are you sure you want to delete this student?')) return;
    try {
      await api.delete(`/${id}`);
      toast.success('Student deleted successfully');
      fetchStudents();
    } catch (error) {
      toast.error('Failed to delete student');
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-300 via-pink-500 to-purple-600 text-white px-4 py-10">
      <ToastContainer />
      <div className="max-w-7xl mx-auto">

        {/* Header with Button */}
        <div className="flex justify-between items-center mb-8 flex-wrap gap-4">
          <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">🎨  Student Directory</h2>
          <Link
            to="/students/add"
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            ➕ Add New Student
          </Link>
        </div>

        {/* Search */}
        <div className="flex justify-start mb-6">
          <input
            type="text"
            className="w-full md:w-1/2 px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring focus:ring-white"
            placeholder="🔎 Search by name or ID..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-3xl shadow-2xl bg-white/10 backdrop-blur-xl">
          <table className="min-w-full text-sm text-white table-auto">
            <thead className="bg-gradient-to-r from-pink-600 to-purple-600 text-white uppercase text-xs">
              <tr>
                <th className="px-4 py-3 text-left">ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">DOB</th>
                <th className="px-4 py-3 text-left">Dept.</th>
                <th className="px-4 py-3 text-left">Enroll</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentStudents.length > 0 ? currentStudents.map((student) => (
                <tr key={student._id} className="border-b border-white/20 hover:bg-white/10 transition-all">
                  <td className="px-4 py-3 font-medium">{student.studentId}</td>
                  <td className="px-4 py-3">{student.firstName} {student.lastName}</td>
                  <td className="px-4 py-3">{student.email}</td>
                  <td className="px-4 py-3">{new Date(student.dob).toLocaleDateString()}</td>
                  <td className="px-4 py-3">{student.department}</td>
                  <td className="px-4 py-3">{student.enrollmentYear}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full font-semibold ${student.isActive ? 'bg-green-500 text-white' : 'bg-red-400 text-white'}`}>
                      {student.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center space-x-2">
                    <Link
                      to={`/students/edit/${student._id}`}
                      className="inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold bg-yellow-300 hover:bg-yellow-400 text-black rounded-full shadow-md"
                    >
                      <FaEdit /> Edit
                    </Link>
                    <button
                      onClick={() => deleteStudent(student._id)}
                      className="inline-flex items-center gap-2 px-3 py-1 text-sm font-semibold bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md"
                    >
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="8" className="text-center px-4 py-6 text-white/60">🚫 No students found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2 flex-wrap">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                className={`px-4 py-2 rounded-full font-bold transition text-white shadow-md ${
                  currentPage === i + 1
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-500'
                    : 'bg-white/10 rounded-full hover:bg-indigo-400'
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;
