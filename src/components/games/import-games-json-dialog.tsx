'use client';
import React, { useState } from 'react';
import { useSpinnerStore } from '~/state-management/spinner-store';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import scrollStyles from '~/css-modules/scrollbar.module.css';
import { Paperclip } from 'lucide-react';
import JsonImporter from '../json-importer';
import { cn } from '~/lib/utils';
import { bulkAddGameSchema } from '~/schema/bulk-add-game-schema';
import { toast } from 'sonner';
import { useBulkAddGames } from '~/services/game-service';
import { BULK_ADD_GAMES_PLACEHOLDER_EXAMPLE } from '~/constants/screen.constants';

/**
 * A dialog component to import games from a JSON file or paste JSON data
 * containing an array of game objects.
 *
 * @returns {JSX.Element}
 */
const ImportGamesJson = ({ children }: { children: React.ReactNode }) => {
  // manage dialog open state
  const [open, setOpen] = useState(false);
  //get spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  //initialize custom hook for bulk upload of games
  const { mutate } = useBulkAddGames();
  // function to handle file upload
  const handleUpload = (file: File) => {
    // in case no file
    if (!file) return;
    // start loading
    setSpinner(true);
    mutate(file, {
      onSuccess: (data) => {
        // pop success toast
        toast.success(data.message ?? 'Games imported successfully', {
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
            Import Games from JSON
          </DialogTitle>
          <DialogDescription>
            Upload a JSON file or paste JSON data containing an array of game
            objects
          </DialogDescription>
        </DialogHeader>
        <JsonImporter
          onSuccess={handleUpload}
          schema={bulkAddGameSchema}
          customPlaceholder={BULK_ADD_GAMES_PLACEHOLDER_EXAMPLE}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImportGamesJson;
