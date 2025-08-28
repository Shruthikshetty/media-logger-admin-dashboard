import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Card } from './ui/card';
import { ImageIcon, UploadIcon } from 'lucide-react';
import { Button } from './ui/button';

const UpdateProfileImage = ({ children }: { children: React.ReactNode }) => {
  //dialog open state
  const [open, setOpen] = useState(false);
  //file input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //check if file exists
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      console.log('file uploaded');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[50%] lg:min-w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Upload Profile Image</DialogTitle>
          <DialogDescription hidden>
            Modal to upload profile image
          </DialogDescription>
        </DialogHeader>
        {/* main content  */}
        <div>
          {/* drag and drop area */}
          <Card className="border-ui-600 hover:border-ui-400 flex flex-col items-center justify-center gap-4 border-2 border-dashed bg-transparent">
            <div className="bg-ui-700 rounded-full p-2">
              <ImageIcon className="text-ui-400 h-7 w-7" />
            </div>
            <div className="text-base-white text-center">
              <p className="text-base">Drag and drop your image here</p>
              <p className="text-ui-400 text-sm">or click to browse files</p>
            </div>
            {/* file upload button */}
            <Button
              aria-label="upload file button"
              type="button"
              variant="outline"
              onClick={() => {
                fileInputRef.current?.click();
              }}
              className="text-base-white"
            >
              <UploadIcon className="mr-3 size-4" />
              Choose File
            </Button>
            <p className="text-ui-400 text-sm">
              PNG, JPG up to 2MB • Will be cropped to square
            </p>
          </Card>
          {/* file input hidden*/}
          <input
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileImage;
