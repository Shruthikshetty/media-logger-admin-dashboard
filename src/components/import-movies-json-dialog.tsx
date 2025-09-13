'use client';
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Paperclip } from 'lucide-react';
import JsonImporter from './json-importer';
import { addMovieSchema } from '~/schema/add-movie-schema';

type ImportMoviesJsonProps = {
  children: React.ReactNode;
};

const ImportMoviesJson = ({ children }: ImportMoviesJsonProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 max-h-[95vh] max-w-[95%] min-w-[80%]">
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center gap-2">
            <Paperclip />
            Import Movies from JSON
          </DialogTitle>
          <DialogDescription>
            Upload a JSON file or paste JSON data containing an array of movie
            objects
          </DialogDescription>
        </DialogHeader>
        <JsonImporter onSuccess={() => {}} schema={addMovieSchema} />
      </DialogContent>
    </Dialog>
  );
};

export default ImportMoviesJson;
