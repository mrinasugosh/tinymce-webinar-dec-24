import React, { useState, useRef } from 'react';
import Sidebar from './components/Sidebar';
import Blog from './components/Blog';
import './styles/App.css';

function App() {
  const editorRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: 'Mrina Sugosh',
    publishDate: '2024-12-10',
    category: 'Travel Tips',
    tags: ['Sights', 'Itineraries', 'Europe'],
    cover: 'https://www.weather.is/wp-content/uploads/2023/03/Top25.png'
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const toggleReadOnlyMode = () => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const isReadonly = editor.mode.get() === 'readonly';
      editor.mode.set(isReadonly ? 'design' : 'readonly');
    }
  };

  return (
    <div className="container">
      <div className="mainContent">
        <Blog formData={formData} onFormChange={handleFormChange} editorRef={editorRef} />
        <Sidebar formData={formData} handleFormChange={handleFormChange} toggleReadOnlyMode={toggleReadOnlyMode} />
      </div>
    </div>
  );
}

export default App;