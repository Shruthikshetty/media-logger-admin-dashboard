import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { Card } from './ui/card';
import { ImageIcon, Upload, UploadIcon } from 'lucide-react';
import { Button } from './ui/button';

const UpdateProfileImage = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-brand-900 border-ui-600 max-w-[95%] min-w-[50%] lg:min-w-[40%]">
        <DialogHeader>
          <DialogTitle className="text-xl">Upload Profile Image</DialogTitle>
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
            <Button
              variant="outline"
              onClick={() => {}}
              className="text-base-white"
            >
              <UploadIcon className="mr-3 size-4" />
              Choose File
            </Button>
            <p className="text-ui-400 text-sm">
              PNG, JPG up to 2MB • Will be cropped to square
            </p>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileImage;
