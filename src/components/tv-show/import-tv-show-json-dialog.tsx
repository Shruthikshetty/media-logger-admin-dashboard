import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { cn } from '~/lib/utils';
import scrollStyles from '~/css-modules/scrollbar.module.css';
import { Paperclip } from 'lucide-react';
import JsonImporter from '../json-importer';
import { bulkAddTvShowSchema } from '~/schema/bulk-add-tv-show-schema';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { useBulkAddTvShowJson } from '~/services/tv-show-service';
import { toast } from 'sonner';
import { BULK_ADD_TV_SHOWS_PLACEHOLDER_EXAMPLE } from '~/constants/screen.constants';

/**
 * This component displays a dialog for importing TV show JSON data.
 * can be used to add an array of tv show objects from a JSON file or paste JSON data.
 * @returns {JSX.Element}
 */
const ImportTvShowJsonDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // manage dialog open state
  const [open, setOpen] = useState(false);
  //get spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  //initialize custom hook to bulk add tv show
  const { mutate } = useBulkAddTvShowJson();
  // handle tv show upload
  const handleUpload = (file: File) => {
    // in case no file
    if (!file) return;
    // start loading
    setSpinner(true);
    // make api call
    mutate(file, {
      onSuccess: (data) => {
        // send success message
        toast.success(data.message ?? 'Tv shows imported successfully', {
          classNames: {
            toast: '!bg-feedback-success',
          },
        });
        // close dialog
        setOpen(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data.message ?? 'Something went wrong', {
          classNames: {
            toast: '!bg-feedback-error',
            title: '!line-clamp-3',
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
            Import Tv Show from JSON
          </DialogTitle>
          <DialogDescription>
            Upload a JSON file or paste JSON data containing an array of Tv Show
            objects
          </DialogDescription>
        </DialogHeader>
        <JsonImporter
          onSuccess={handleUpload}
          schema={bulkAddTvShowSchema}
          customPlaceholder={BULK_ADD_TV_SHOWS_PLACEHOLDER_EXAMPLE}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImportTvShowJsonDialog;
