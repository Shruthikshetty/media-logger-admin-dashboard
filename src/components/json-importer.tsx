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
import { ZodType } from 'zod';

const JsonImporter = ({
  onSuccess,
  fileName = 'imported.json',
  schema,
}: {
  onSuccess: (file: File) => void;
  fileName?: string;
  schema: ZodType;
}) => {
  // store json text
  const [jsonString, setJsonString] = useState('');
  //store the input ref
  const inputRef = useRef<HTMLInputElement>(null);
  // state to store validation errors
  const [errors, setErrors] = useState<string[]>([]);
  // state to store the file name
  const [isValidated, setIsValidated] = useState(false);

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
   * Validates the given json string to match the given schema.
   * If the json string is invalid or the schema is not provided, it returns false.
   * Otherwise, it returns true.
   * If the validation fails, it sets the errors state with the validation errors.
   */
  const validateJsonSchema = () => {
    if (!jsonString || !schema) return false;
    let data: unknown;
    try {
      data = JSON.parse(jsonString);
    } catch (err) {
      setErrors(['Invalid JSON: ' + (err as Error).message]);
      setIsValidated(false);
      return false;
    }
    // validate json to match the schema
    const result = schema.safeParse(data);
    if (!result.success) {
      //filter out duplicate errors
      const validationErrors = [
        ...new Set(result.error.issues.map((issue) => issue.message)),
      ];
      //set the errors
      setErrors(validationErrors);
      setIsValidated(false);
      return false;
    } else {
      setErrors([]);
      setIsValidated(true);
      return true;
    }
  };

  /**
   * This function is called when the user confirms the import.
   * this will convert the json string to a json file and return the file as a callback
   */
  const handleConfirm = () => {
    try {
      // in case validation fails
      if (!validateJsonSchema()) return;
      // in case validation passes
      const blob = new Blob([jsonString], { type: 'application/json' });
      const jsonFile = new File([blob], fileName, { type: 'application/json' });
      // return the file on success
      onSuccess(jsonFile);
    } catch {
      toast.error('Failed to import json , check your json format', {
        classNames: {
          toast: '!bg-feedback-error',
        },
      });
    }
  };

  return (
    <div className="text-base-white flex min-w-0 flex-1 flex-col gap-3">
      <div className="flex flex-col gap-2">
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
      <div className="flex flex-col gap-2">
        <Label htmlFor="code-editor">Or Paste JSON</Label>
        {/* code area */}
        <CodeMirror
          id="code-editor"
          width="full"
          minHeight="25vh"
          maxHeight="60vh"
          value={jsonString}
          onChange={setJsonString}
          extensions={[json(), lintGutter()]}
          theme={'dark'}
          className={cn(
            'flex-1 text-sm [&_.cm-scroller]:flex-1',
            scrollStyles.scrollContainer,
          )}
          placeholder={CODE_AREA_PLACEHOLDER_EXAMPLE}
        />
      </div>
      {errors.length > 0 && (
        <div>
          <p className="text-ui-400 text-sm font-normal">
            Validation errors found , please validate before import : -
          </p>
          <p className="text-feedback-error text-sm">{errors.join(', ')}</p>
        </div>
      )}
      {isValidated && !(errors.length > 0) && (
        <p className="text-feedback-success text-sm">
          Validated successfully✔️
        </p>
      )}
      <div className="flex flex-row items-center gap-3">
        <Button
          variant={'outline'}
          className="flex-1"
          type="button"
          disabled={!jsonString}
          onClick={validateJsonSchema}
        >
          Validate
        </Button>
        <Button
          className="flex-1"
          variant={'blue'}
          type="button"
          onClick={handleConfirm}
          disabled={!jsonString}
        >
          Confirm Import
        </Button>
      </div>
    </div>
  );
};

export default JsonImporter;
