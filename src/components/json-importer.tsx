'use client';
import React, { useRef, useState } from 'react';
import { Label } from './ui/label';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { lintGutter } from '@codemirror/lint';
import { Button } from './ui/button';
import scrollStyles from '~/css-modules/scrollbar.module.css';
import { cn } from '~/lib/utils';
import { CODE_AREA_PLACEHOLDER_EXAMPLE } from '~/constants/screen.constants';

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
      <div className="flex max-h-[60svh] flex-1 flex-grow flex-col gap-2 sm:max-h-[70svh]">
        <Label htmlFor="code-editor">Or Paste JSON</Label>
        {/* code area */}

        <CodeMirror
          id="code-editor"
          value={jsonString}
          onChange={setJsonString}
          extensions={[json(), lintGutter()]}
          theme={'dark'}
          className={cn(
            'h-full w-full overflow-auto text-sm',
            scrollStyles.scrollContainer,
          )}
          placeholder={CODE_AREA_PLACEHOLDER_EXAMPLE}
        />
      </div>
      <Button variant={'blue'} type="button">
        Confirm Import
      </Button>
    </div>
  );
};

export default JsonImporter;
