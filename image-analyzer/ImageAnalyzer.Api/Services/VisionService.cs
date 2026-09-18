using Azure;
using Azure.AI.Vision.ImageAnalysis;

namespace ImageAnalyzer.Api.Services
{
    public class VisionService
    {
        private readonly ImageAnalysisClient _imageAnalyzerClient;

        public VisionService(ImageAnalysisClient imageAnalyzerClient)
        {
            _imageAnalyzerClient = imageAnalyzerClient;
        }

        public async Task<ImageAnalysisResult> AnalyzeImageAsync(Stream imageStream)
        {
            var imageData = BinaryData.FromStream(imageStream);

            var visualFeatures =
                VisualFeatures.Tags |
                VisualFeatures.Caption |
                VisualFeatures.Objects;

            Response<ImageAnalysisResult> response =
                await _imageAnalyzerClient.AnalyzeAsync(
                    imageData,
                    visualFeatures);

            return response.Value;
        }
    }
}