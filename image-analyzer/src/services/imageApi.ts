import type {ImageAnalysisResult} from "../types/ImageAnalysisResult";

export async function analyzeImage(file: File): Promise<ImageAnalysisResult> {
    const formData = new FormData();

    formData.append("image", file);
    const response = await fetch("http://localhost:5278/api/image/analyze", {
    method: "POST",
    body: formData
});

if (!response.ok) {
    throw new Error("API-anropet misslyckades.");
}

const result = await response.json();

return result;
}