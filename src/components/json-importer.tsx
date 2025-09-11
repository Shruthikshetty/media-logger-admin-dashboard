'use client';
import React, { useRef, useState } from 'react';
import { Label } from './ui/label';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { lintGutter } from '@codemirror/lint';
import { Button } from './ui/button';

const JsonImporter = () => {
  const [jsonString, setJsonString] = useState('');
  //store the input ref
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <div className="text-base-white flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label className="text-base">Upload JSON File</Label>
        {/* hidden file input */}
        <input type="file" accept=".json" ref={inputRef} hidden />
        <Button
          variant={'outline'}
          type="button"
          onClick={() => inputRef.current?.click()}
        >
          Upload Json
        </Button>
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="code-editor">Or Paste JSON</Label>
        {/* code area */}
        <CodeMirror
          id="code-editor"
          value={jsonString}
          onChange={setJsonString}
          extensions={[json(), lintGutter()]}
          theme={'dark'}
          className="flex-1 overflow-auto text-sm"
          placeholder={`[\n\t{\n\t\t\"title\": \"The Shawshank ..\",\n\t\t\"description\": \"Two imprisoned ...\"\n\t},\n]`}
        />
      </div>
      <Button variant={'blue'} type="button">
        Confirm Import
      </Button>
    </div>
  );
};

export default JsonImporter;
