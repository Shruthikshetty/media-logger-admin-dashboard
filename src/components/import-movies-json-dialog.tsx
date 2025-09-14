'use client';
import React, { useState } from 'react';
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
import scrollStyles from '~/css-modules/scrollbar.module.css';
import { cn } from '~/lib/utils';
import { bulkAddMovieSchema } from '~/schema/bulk-add-movie-schema';
import { useBulkAddMoviesJson } from '~/services/movies-service';
import { toast } from 'sonner';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { useQueryClient } from '@tanstack/react-query';
import { QueryKeys } from '~/constants/query-key.constants';

type ImportMoviesJsonProps = {
  children: React.ReactNode;
};

/**
 * A dialog component to import movies from a JSON file or paste JSON data
 * containing an array of movie objects.
 *
 * @param {React.ReactNode} children - The trigger element to open the dialog.
 *
 * @returns {JSX.Element} The dialog component.
 * @example
 * <ImportMoviesJson>
 *   <Button>Import Movies from JSON</Button>
 * </ImportMoviesJson>
 */
const ImportMoviesJson = ({ children }: ImportMoviesJsonProps) => {
  // manage dialog open state
  const [open, setOpen] = useState(false);
  //get spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  // get the query client
  const queryClient = useQueryClient();
  //initialize custom hook for bulk upload
  const { mutate } = useBulkAddMoviesJson();

  const handleUpload = (file: File) => {
    console.log(typeof file);
    // in case no file
    if (!file) return;
    // start loading
    setSpinner(true);
    // execute mutation
    mutate(file, {
      onSuccess: (data) => {
        // pop success toast
        toast.success(data.message ?? 'Movies imported successfully', {
          classNames: {
            toast: '!bg-feedback-success',
          },
        });
        // close dialog
        setOpen(false);
        //  invalidate filter data
        queryClient.invalidateQueries({
          queryKey: [QueryKeys.filterMovies],
        });
      },
      onError: (error) => {
        toast.error(error?.response?.data.message ?? 'Something went wrong', {
          classNames: {
            toast: '!bg-feedback-error',
          },
        });
      },
      onSettled: () => {
        // stop loading
        setSpinner(false);
      },
    });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          'bg-brand-900 max-h-[95vh] max-w-[95%] min-w-[80%] overflow-auto',
          scrollStyles.scrollContainer,
        )}
      >
        <DialogHeader>
          <DialogTitle className="flex flex-row items-center justify-center gap-2 sm:justify-start">
            <Paperclip />
            Import Movies from JSON
          </DialogTitle>
          <DialogDescription>
            Upload a JSON file or paste JSON data containing an array of movie
            objects
          </DialogDescription>
        </DialogHeader>
        <JsonImporter onSuccess={handleUpload} schema={bulkAddMovieSchema} />
      </DialogContent>
    </Dialog>
  );
};

export default ImportMoviesJson;
