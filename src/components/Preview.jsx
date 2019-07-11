import React from 'react';
import ReactMarkdown from 'react-markdown';

const Preview = ({ editorText }) => {
  return (
    <div>
      <div className="preview">
        <ReactMarkdown source={editorText} />
      </div>
    </div>
  )
}

export default Preview;