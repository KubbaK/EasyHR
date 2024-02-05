import React, { useState } from 'react';
import styled from 'styled-components';
import { addEmployees } from '../services/employeeService';
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
  margin-right: 10px;
`;

const GoBackButton = styled(Button)`
  background-color: #ccc;
`;

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    firstName: '',
    lastName: '',
    position: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addEmployees(employee.firstName, employee.lastName, employee.position);
    } catch (error) {
      console.error('Error handling course assignment:', error.message);
    }
    setEmployee({
      firstName: '',
      lastName: '',
      position: '',
    });
  };

  const handleGoBack = () => {
    // Navigate back to the employee list
    navigate('/employees');
  };

  return (
    <div>
      <h2 style={{marginLeft:"10px"}}>Add Employee</h2>
      <Form onSubmit={handleSubmit}>
        <Label>
          First Name:
          <Input
            type="text"
            name="firstName"
            value={employee.firstName}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Last Name:
          <Input
            type="text"
            name="lastName"
            value={employee.lastName}
            onChange={handleChange}
          />
        </Label>
        <Label>
          Position:
          <Input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
          />
        </Label>
        <Button type="submit">Add Employee</Button>
        <GoBackButton type="button" onClick={handleGoBack}>
          Go Back
        </GoBackButton>
      </Form>
    </div>
  );
};

export default AddEmployee;
