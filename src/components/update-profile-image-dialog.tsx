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
import { Progress } from './ui/progress';
import { dataURLToFile, resizeImageKeepAspect } from '~/lib/image-resize';
import { MAX_IMAGE_SIZE } from '~/constants/config.constants';
import Image from 'next/image';

const UpdateProfileImage = ({ children }: { children: React.ReactNode }) => {
  //dialog open state
  const [open, setOpen] = useState(false);
  // image state
  const [image, setImage] = useState<File>(); // image file
  //file input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  // image upload progress state
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadProgress(0);
    //check if file exists
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      //in case file size is > 2mb
      if (file.size > MAX_IMAGE_SIZE) {
        setUploadProgress(10);
        //read image data
        const reader = new FileReader();

        reader.onload = async (event) => {
          setUploadProgress(40);
          const img = new window.Image();
          img.src = event.target?.result as string;

          img.onload = async () => {
            setUploadProgress(70); // resizing
            //resize and store
            const resized = resizeImageKeepAspect({
              img,
              maxWidth: 500,
              maxHeight: 700,
            });
            //convert to file
            const imageFile = dataURLToFile(resized, file.name);
            setImage(imageFile);
            setUploadProgress(100);
          };

          img.onerror = () => {
            setUploadProgress(0);
          };
        };
        reader.onerror = () => {
          setUploadProgress(0);
        };
        reader.readAsDataURL(file);
      } else {
        //not resized
        setImage(file);
        setUploadProgress(100);
      }
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
          {uploadProgress < 100 && (
            <>
              {/* drag and drop area */}
              <Card className="border-ui-600 hover:border-ui-400 flex flex-col items-center justify-center gap-4 border-2 border-dashed bg-transparent">
                <div className="bg-ui-700 rounded-full p-2">
                  <ImageIcon className="text-ui-400 h-7 w-7" />
                </div>
                <div className="text-base-white text-center">
                  <p className="text-base">Drag and drop your image here</p>
                  <p className="text-ui-400 text-sm">
                    or click to browse files
                  </p>
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
                {/* upload progress container  */}
                {uploadProgress > 0 && (
                  <div className="flex w-full flex-col gap-2 px-5">
                    <p className="text-base-white text-base">
                      Processing your image ...
                    </p>
                    <Progress
                      value={uploadProgress}
                      className="border-ui-600 [&>*]:bg-brand-500 h-4 animate-pulse border bg-transparent"
                    />
                  </div>
                )}
              </Card>
            </>
          )}

          {/* show uploaded image  */}
          {uploadProgress === 100 && image && (
            <Card className="border-ui-600 flex items-center justify-center border bg-transparent">
              <Image
                src={URL.createObjectURL(image)}
                alt="profile image"
                width={500}
                height={700}
              />
              {/* buttons container  */}
              <div className="flex flex-row gap-2">
                <Button variant={'outline'} className="text-base-white">
                  Back
                </Button>
                <Button variant={'blue'}>Continue</Button>
              </div>
            </Card>
          )}

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
