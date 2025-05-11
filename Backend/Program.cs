using Backend.Repo;
using Backend.Services;
using Backend.Services.Impl;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<RepoContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Connection"), sqlOptions =>
        sqlOptions.EnableRetryOnFailure())); // Add retry logic here

builder.Services.AddScoped<IUsersServices, UserServices>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // If you get an error like "Please indicate a valid Swagger or OpenAPI version field"
    // Then press Ctrl + Shift + R, if that doesn't work, then check https://localhost:<port>/swagger/v1/swagger.json
    // to make sure the field is there. If it isn't google the issue
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
