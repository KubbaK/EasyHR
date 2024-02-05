import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCourses, deleteCourse } from '../services/courseService';

const Table = styled.table`
  width: 99%;
  border-collapse: collapse;
  margin-top: 20px;
  margin-left: 10px;
`;

const Th = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #dddddd;
  text-align: left;
  padding: 10px 20px;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px 12px;
`;

const Button = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 20px;
  margin-left: 10px;

  &:hover {
    background-color: #0056b3;
  }
`;

const DeleteButton = styled.button`
  background-color: #dc3545;
  color: #fff;
  padding: 7px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    background-color: #c82333;
  }
`;

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await getCourses();
      setCourses(response.data);
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (id) => {
    try {
      await deleteCourse(id);
      // Update the course list after deletion
      const updatedCourses = courses.filter(course => course.id !== id);
      setCourses(updatedCourses);
    } catch (error) {
      console.error('Error deleting course:', error.message);
    }
  };

  return (
    <div>
      <h2 style={{ marginLeft: "10px" }}>Courses List</h2>
      <Button to="/add-course">Add Course</Button>
      {courses.length === 0 ? (
        <p style={{ textAlign:"center"}}>Jeszcze nie dodano żadnego kursu. Dodaj coś!</p>
      ) : (
        <Table>
          <thead>
            <tr>
              <Th>Title</Th>
              <Th>Description</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {courses.map(course => (
              <tr key={course.id}>
                <Td>{course.title}</Td>
                <Td>{course.description}</Td>
                <Td>
                  <DeleteButton onClick={() => handleDeleteCourse(course.id)}>
                    Delete
                  </DeleteButton>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default CourseList;
