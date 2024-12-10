import React from 'react';
import TinyEditor from './TinyEditor';

const Blog = ({ formData, onFormChange, editorRef }) => {
  return (
    <div className="blogForm">
      <input
        type="text"
        name="title"
        className="form-control title-input"
        placeholder="Top 5 sights to see in Iceland in under a week"
        value={formData.title}
        onChange={onFormChange}
      />
      <TinyEditor editorRef={editorRef} />
    </div>
  );
};

export default Blog;
