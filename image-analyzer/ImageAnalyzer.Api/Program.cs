var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.MapPost("/api/image/analyze", async (IFormFile image) =>
{
    return Results.Ok(new
    {
        FileName = image.FileName,
        ContentType = image.ContentType
    });
});

app.Run();