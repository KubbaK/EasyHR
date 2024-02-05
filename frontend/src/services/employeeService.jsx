import axios from 'axios';

const API_BASE_URL = window.location.host;//

export const getEmployees = async () => {
  return await axios.get(`http://${API_BASE_URL}/Employee-api/api/employee`);
};

export const addEmployees = async (firstName,lastName,position) => {
    const requestBody = {
        firstName: firstName,
        lastName: lastName,
        position: position
      };


    return await axios.post(`http://${API_BASE_URL}/Employee-api/api/employee`, requestBody);
  };

export const assignCourse = async (employeeId, courseTitle) => {
    const requestBody = {
      employeeId: parseInt(employeeId),
      title: courseTitle,
    };
  
    return await axios.post(`http://${API_BASE_URL}/Employee-api/api/AssignedCourses`, requestBody)
};

export const getAssignedCourse = async () => {
  return await axios.get(`http://${API_BASE_URL}/Employee-api/api/AssignedCourses`)
};
