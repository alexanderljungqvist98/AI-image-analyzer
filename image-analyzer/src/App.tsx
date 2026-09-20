import { useState } from 'react';
import { analyzeImage } from "./services/imageApi";
import type { ImageAnalysisResult } from "./types/ImageAnalysisResult";
import "./App.css";





function App(){
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="app">
      <h1>(っ◔◡◔)っ ♥ Image Analyzer ♥</h1>

      <input
    type="file"
    accept="image/*"
    onChange={(e) => {
        setSelectedFile(e.target.files?.[0] || null );
        setAnalysisResult(null);
        setError(null);
    }}
/>

{selectedFile && (
    <div>
<p className="file-name">{selectedFile.name}</p>

        <img className="image-preview"
         src={URL.createObjectURL(selectedFile)} />

     <button
    disabled={isLoading}
   onClick={async () => {
    setIsLoading(true);
    setError(null);

    try {
       const result = await analyzeImage(selectedFile);
       setAnalysisResult(result);
} catch (error) {
    console.error(error);

    setError(
        error instanceof Error
            ? error.message
            : "Något gick fel vid analysen."
    );
} finally {
    setIsLoading(false);
}
}}
>
    {isLoading ? "Analyserar..." : "Analysera bild"}
</button>
    </div>
)}

{analysisResult && (
    <div>
        <h2>Analysresultat</h2>

         <p className="result-description">
            AI:n hittade följande egenskaper i bilden:
        </p>

        <div className="tag-list">
            {analysisResult.tags.values.map((tag) => (
                <div className="tag-result" key={tag.name}>
                    <p>{tag.name}</p>
                    <p>Confidence: {(tag.confidence * 100).toFixed(1)}%</p>
                </div>
            ))}
        </div>
    </div>
)}

{error && <p>{error}</p>}


    </div>

  );


}
export default App;