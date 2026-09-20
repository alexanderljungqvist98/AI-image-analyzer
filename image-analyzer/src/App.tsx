import { useState } from 'react';

interface ImageAnalysisResult {
    tags: {
        values: {
            confidence: number;
            name: string;
        }[];
    };
}



function App(){
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysisResult, setAnalysisResult] = useState<ImageAnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <h1>Image Analyzer</h1>

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
        <p>{selectedFile.name}</p>

        <img src={URL.createObjectURL(selectedFile)} />

     <button
    disabled={isLoading}
   onClick={async () => {
    setIsLoading(true);
    setError(null);

    try {
        const formData = new FormData();
        formData.append("image", selectedFile);

        const response = await fetch("http://localhost:5278/api/image/analyze", {
            method: "POST",
            body: formData
        });

        if (!response.ok) {
            throw new Error("API anropet misslyckades.");
        }

     const result = await response.json();

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
        {analysisResult.tags.values.map((tag) => (
            <p key={tag.name}>
                {tag.name} - {(tag.confidence * 100).toFixed(1)}%
            </p>
        ))}
    </div>
)}

{error && <p>{error}</p>}


    </div>

  );


}
export default App;