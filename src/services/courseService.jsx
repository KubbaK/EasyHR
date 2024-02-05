import axios from 'axios';

const API_BASE_URL = window.location.host;//

export const getCourses = async () => {
  return await axios.get(`http://${API_BASE_URL}/Courses-api/api/courses`);
};

export const addCourses = async (title,description) => {
    const requestBody = {
        title: title,
        description: description
      };


    return await axios.post(`http://${API_BASE_URL}/Courses-api/api/courses`, requestBody);
  };

  export const deleteCourse = async (courseId) => {
    await axios.delete(`http://${API_BASE_URL}/Courses-api/api/courses/${courseId}`);
    await axios.delete(`http://${API_BASE_URL}/Employee-api/api/AssignedCourses/${courseId}`);
  };
  
