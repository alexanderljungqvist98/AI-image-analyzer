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

  return (
    <div>
      <h1>Image Analyzer</h1>

      <input
    type="file"
    accept="image/*"
    onChange={(e) => setSelectedFile(e.target.files?.[0] || null) }
/>

{selectedFile && (
    <div>
        <p>{selectedFile.name}</p>

        <img src={URL.createObjectURL(selectedFile)} />

        <button
    onClick={async () => {
        const formData = new FormData();
        formData.append('image', selectedFile);

        const response = await fetch("http://localhost:5278/api/image/analyze", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
       setAnalysisResult(result);
    }}
>
    Analysera bild
</button>
    </div>
)}

{analysisResult && (
    <div>
        {analysisResult.tags.values.map((tag) => (
            <p>{tag.name} - {(tag.confidence * 100).toFixed(1)}%</p>
        ))}
    </div>
)}

    </div>

  );


}
export default App;