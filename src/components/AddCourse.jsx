import React, { useState } from 'react';
import styled from 'styled-components';
import { addCourses } from '../services/courseService';
import { useNavigate } from 'react-router-dom';

const Form = styled.form`
  width: 50%;
  margin: 20px auto;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 5px;

  &:hover {
    background-color: #0056b3;
  }
`;

const GoBackButton = styled(Button)`
  background-color: #ccc;
`;

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const navigate = useNavigate();
  const handleGoBack = () => {
    // Navigate back to the employee list
    navigate('/courses');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCourses(course.title, course.description);
    } catch (error) {
      console.error('Error adding course:', error.message);
    }
    setCourse({
      title: '',
      description: '',
    });
  };

  return (
    <div>
      <h2 style={{marginLeft:"10px"}}>Add Course</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          Title:
          <Input
            type="text"
            name="title"
            value={course.title}
            onChange={handleChange}
            required
          />
        </Label>
        <Label>
          Description:
          <Input
            type="text"
            name="description"
            value={course.description}
            onChange={handleChange}
            required
          />
        </Label>
        <Button type="submit">Add Course</Button>
        <GoBackButton type="button" onClick={handleGoBack}>
          Go Back
        </GoBackButton>
      </Form>
    </div>
  );
};

export default AddCourse;
