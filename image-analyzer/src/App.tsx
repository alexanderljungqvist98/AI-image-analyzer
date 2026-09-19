import { useState } from 'react';

const [selectedFile, setSelectedFile] = useState<File | null>(null);

function App(){

  return (
    <div>
      <h1>Image Analyzer</h1>

      <input
    type="file"
    accept="image/*"
    onChange={(e) => setSelectedFile(e.target.files?.[0] || null) }
/>

{selectedFile && <p>{selectedFile.name}</p>}


    </div>

  );


}
export default App;