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
import { toast } from 'sonner';

const JsonImporter = ({
  onSuccess,
  fileName = 'imported.json',
}: {
  onSuccess: (file: File) => void;
  fileName?: string;
}) => {
  // store json text
  const [jsonString, setJsonString] = useState('');
  //store the input ref
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handles file change event on input element.
   * If a file is selected, it reads the file as text and updates the json string state.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      //set the json on load
      reader.onload = () => {
        setJsonString(reader.result as string);
      };
      reader.readAsText(file);
    }
  };

  /**
   * This function is called when the user confirms the import.
   * this will convert the json string to a json file and return the file as a callback
   */
  const handleConfirm = () => {
    try {
      // parse json
      const data = JSON.parse(jsonString);
      //@todo  validate json to match the schema
      const blob = new Blob([jsonString], { type: 'application/json' });
      const jsonFile = new File([blob], fileName, { type: 'application/json' });
      // return the file on success
      onSuccess(jsonFile);
    } catch (e) {
      console.log(e);
      toast.error('Failed to import json , check your json format', {
        classNames: {
          toast: '!bg-feedback-error',
        },
      });
    }
  };

  return (
    <div className="text-base-white flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <Label className="text-base">Upload JSON File</Label>
        {/* hidden file input */}
        <input
          type="file"
          accept=".json"
          ref={inputRef}
          hidden
          onClick={(e: React.MouseEvent<HTMLInputElement>) =>
            //reset the input value
            ((e.target as HTMLInputElement).value = '')
          }
          onChange={handleFileChange}
        />
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
      <Button
        variant={'blue'}
        type="button"
        onClick={handleConfirm}
        disabled={!jsonString}
      >
        Confirm Import
      </Button>
    </div>
  );
};

export default JsonImporter;
