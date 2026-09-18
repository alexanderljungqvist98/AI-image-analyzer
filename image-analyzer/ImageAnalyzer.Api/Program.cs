using Azure;
using Azure.AI.Vision.ImageAnalysis;
using ImageAnalyzer.Api.Services;

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

    builder.Services.AddScoped<VisionService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}



app.MapPost("/api/image/analyze", async (IFormFile image, 
VisionService visionService) =>
{
    await using var stream = image.OpenReadStream();
    var result = await visionService.AnalyzeImageAsync(stream);
    return Results.Ok(result);
})
.DisableAntiforgery();

app.Run();