'use client';
import React from 'react';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import {
  AlertDialogAction,
  AlertDialogCancel,
} from '@radix-ui/react-alert-dialog';
import { Button } from './ui/button';

type CustomAlertProps = {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
  description?: string;
  onConfirm?: () => void;
  showCancel?: boolean;
  cancelText?: string;
  confirmText?: string;
};

/**
 * A custom alert dialog component.
 *
 * @param {boolean} [open=false] whether the dialog is open (optional)
 * @param {(open: boolean) => void} [setOpen] function to set whether the dialog is open (optional)
 * @param {React.ReactNode} children the element that will trigger the dialog when clicked
 * @param {string} title the title of the dialog
 * @param {string} [description] the description of the dialog
 * @param {() => void} [onConfirm] the function to run when the confirm button is clicked
 * @param {boolean} [showCancel=true] whether to show a cancel button
 * @param {string} [cancelText='Cancel'] the text of the cancel button
 * @param {string} [confirmText='Confirm'] the text of the confirm button
 * @returns {JSX.Element} the custom alert dialog component
 */
const CustomAlert = ({
  children,
  open,
  setOpen,
  showCancel = true,
  title,
  description,
  onConfirm,
  cancelText = 'Cancel',
  confirmText = 'Confirm',
}: CustomAlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-base-black text-base-white">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription className="text-ui-400 text-md">
              {description}
            </AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-end gap-2 md:justify-center">
          {showCancel && (
            <AlertDialogCancel asChild>
              <Button variant="blue" aria-label="Cancel Alert" type="button">
                {cancelText}
              </Button>
            </AlertDialogCancel>
          )}
          {onConfirm && (
            <AlertDialogAction asChild onClick={() => onConfirm?.()}>
              <Button variant="red">{confirmText}</Button>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CustomAlert;
