// Services/EmployeeService.cs

using System.Collections.Generic;
using System.Linq;
using EmployeesService.Data;
using EmployeesService.Models;

namespace EmployeesService.Services
{
    public class EmployeeService
    {
        private readonly EmployeesDbContext _dbContext;

        public EmployeeService(EmployeesDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public IEnumerable<EmployeesModel> GetEmployees()
        {
            return _dbContext.employees.ToList();
        }

        public EmployeesModel GetEmployeeById(int id)
        {
            return _dbContext.employees.Find(id);
        }

        public EmployeesModel AddEmployee(EmployeesModel employee)
        {
            _dbContext.employees.Add(employee);
            _dbContext.SaveChanges();
            return employee;
        }

        public void DeleteEmployee(int id)
        {
            var employee = _dbContext.employees.Find(id);
            if (employee != null)
            {
                _dbContext.employees.Remove(employee);
                _dbContext.SaveChanges();
            }
        }

        
    }
}
