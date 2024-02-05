using EmployeesService.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeesService.Data
{
    public class EmployeesDbContext : DbContext
    {
        public EmployeesDbContext(DbContextOptions<EmployeesDbContext> options)
            : base(options)
        {
        }

        public DbSet<EmployeesModel> employees { get; set; }

        public DbSet<AssignedCoursesModel> assignedcourses { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Dodaj konfiguracje modelu, jeśli to konieczne
        }
    }
}
