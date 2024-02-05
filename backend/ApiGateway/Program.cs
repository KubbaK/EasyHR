using Ocelot.DependencyInjection;
using Ocelot.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile("ocelot.json");

// Add services to the container.
builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
    options.AddPolicy(name: "CORS",
            policy =>
            {
                policy.WithOrigins("*")
                 .AllowAnyHeader()
                 .AllowAnyMethod()
                 .AllowAnyOrigin();
            }));

// Add Ocelot services
builder.Services.AddOcelot(builder.Configuration);



var app = builder.Build();
app.UseCors("CORS");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use Ocelot
app.UseOcelot().Wait();

app.UseAuthorization();


app.MapControllers();

app.Run();

