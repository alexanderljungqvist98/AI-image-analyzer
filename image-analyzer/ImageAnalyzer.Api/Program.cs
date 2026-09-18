using Azure;
using Azure.AI.Vision.ImageAnalysis;

var builder = WebApplication.CreateBuilder(args);

var endpoint = builder.Configuration["AzureVision:Endpoint"]
    ?? throw new InvalidOperationException("AzureVision:Endpoint saknas.");

var key = builder.Configuration["AzureVision:Key"]
    ?? throw new InvalidOperationException("AzureVision:Key saknas.");

    

builder.Services.AddOpenApi();
builder.Services.AddOpenApi();

builder.Services.AddSingleton(new ImageAnalysisClient(
    new Uri(endpoint),
    new Azure.AzureKeyCredential(key)));

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