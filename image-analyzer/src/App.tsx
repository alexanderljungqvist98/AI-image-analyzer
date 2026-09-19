import { useState } from 'react';



function App(){
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    onClick={() => {
        const formData = new FormData();
        formData.append('image', selectedFile);

    }}
>
    Analysera bild
</button>
    </div>
)}

    </div>

  );


}
export default App;