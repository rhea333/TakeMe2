using Backend.BlobStorage;
using Backend.Repo;
using Backend.Services;
using Backend.Services.Impl;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    Args = args,
    WebRootPath = "wwwroot"
});

var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(Int32.Parse(port));
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Override configuration with environment variable
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

builder.Services.AddDbContext<RepoContext>(options =>
    options.UseSqlServer(connectionString, sqlOptions =>
        sqlOptions.EnableRetryOnFailure())); // Add retry logic here

builder.Services.AddScoped<IUsersServices, UserServices>();
builder.Services.AddSingleton<BlobStorageService>();

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

// TEMP MEASURE, DELETE LATER
else
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.RoutePrefix = "swagger";
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapGet("/", () => Results.Ok("OK"));

app.Run();
