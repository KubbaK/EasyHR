import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { assignCourse, getAssignedCourse } from '../services/employeeService';

const AssignCourseContainer = styled.div`
  max-width: 400px;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const Title = styled.h2`
  text-align: center;
  color: #007bff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 8px;
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ListContainer = styled.div`
  max-width: 400px;
  margin: auto;
  margin-top: 30px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
`;

const ListItem = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
`;

const AssignCourse = () => {
    const [employeeId, setEmployeeId] = useState('');
    const [courseTitle, setCourseTitle] = useState('');
    const [assignedCourses, setAssignedCourses] = useState([]);
  
    useEffect(() => {
      const fetchAssignedCourses = async () => {
        try {
          const response = await getAssignedCourse();
          setAssignedCourses(response.data);
        } catch (error) {
          console.error('Error fetching assigned courses:', error.message);
        }
      };
  
      fetchAssignedCourses();
    }, []);
  
    const handleAssignCourse = async (e) => {
      e.preventDefault(); 
  
      try {
        await assignCourse(employeeId, courseTitle);
        const response = await getAssignedCourse();
        setAssignedCourses(response.data);
        setEmployeeId('');
        setCourseTitle('');
      } catch (error) {
        console.error('Error handling course assignment:', error.message);
      }
    };
  
    return (
      <AssignCourseContainer>
        <Title>Assign Course</Title>
        <Form onSubmit={handleAssignCourse}>
          <Label>
            Employee ID(miejsce na liście pracowników):
            <Input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} />
          </Label>
          <Label>
            Course Title:
            <Input type="text" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
          </Label>
          <Button type="submit">Assign Course</Button>
        </Form>
        <ListContainer>
          <Title>Assigned Courses</Title>
          {assignedCourses.length === 0 ? (
            <p style={{textAlign:"center"}}>Jeszcze nic nie przypisano!</p>
          ) : (
            assignedCourses.map((course) => (
              <ListItem key={course.id}>
                <strong>{course.courseTitle}</strong>({course.courseDescription}) for Employee ID: {course.employeesModelId}
              </ListItem>
            ))
          )}
        </ListContainer>
      </AssignCourseContainer>
    );
  };
  
  export default AssignCourse;
