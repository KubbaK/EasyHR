// Controllers/EmployeeController.cs

using EmployeesService.Models;
using Microsoft.AspNetCore.Mvc;
using EmployeesService.Services;

namespace EmployeesService.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeService _employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        // GET: api/employee
        [HttpGet]
        public ActionResult<IEnumerable<EmployeesModel>> GetEmployees()
        {
            var employees = _employeeService.GetEmployees();
            return Ok(employees);
        }

        // GET: api/employee/{id}
        [HttpGet("{id}")]
        public ActionResult<EmployeesModel> GetEmployee(int id)
        {
            var employee = _employeeService.GetEmployeeById(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // POST: api/employee
        [HttpPost]
        public ActionResult<EmployeesModel> AddEmployee(EmployeesModel employee)
        {
            var addedEmployee = _employeeService.AddEmployee(employee);
            return CreatedAtAction(nameof(GetEmployee), new { id = addedEmployee.Id }, addedEmployee);
        }

        // DELETE: api/employee/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteEmployee(int id)
        {
            _employeeService.DeleteEmployee(id);
            return NoContent();
        }
    }
}
