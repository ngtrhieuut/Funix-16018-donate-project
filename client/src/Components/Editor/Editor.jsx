import JoditEditor from "jodit-react";
import React, { useRef } from "react";

const config = {
  buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
};

const Editor = ({ initialValue, getValue }) => {
  const editor = useRef(null);
  return (
    <div id="editor" className="d-flex justify-content-center">
      <div>
        <JoditEditor
          ref={editor}
          value={initialValue}
          config={config}
          tabIndex={1}
          //   onBlur={(newContent) => getValue(newContent)}
          onChange={(newContent) => {
            getValue(newContent);
            console.log(newContent);
          }}
        />
      </div>
    </div>
  );
};

export default Editor;
