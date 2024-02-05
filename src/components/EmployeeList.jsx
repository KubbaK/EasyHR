import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getEmployees } from '../services/employeeService';
import { Link } from 'react-router-dom';

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
  padding: 8px;
`;

const Td = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const AddEmployeeButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  text-decoration: none;
  border-radius: 5px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await getEmployees();
      setEmployees(response.data);
    };

    fetchEmployees();
  }, []);

  return (
    <div>
      <h2 style={{marginLeft:"10px"}}>Employee List</h2>
      <AddEmployeeButton to="/add-employee">Add Employee</AddEmployeeButton>
      <Table>
        <thead>
          <tr>
            <Th>First Name</Th>
            <Th>Last Name</Th>
            <Th>Position</Th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <Td>{employee.firstName}</Td>
              <Td>{employee.lastName}</Td>
              <Td>{employee.position}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeList;
