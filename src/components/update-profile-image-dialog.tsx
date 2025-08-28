import React, { useEffect, useState } from 'react';
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
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useUploadImage } from '~/services/uploads-service';
import {
  useGetUserDetails,
  useUpdateUserDetails,
} from '~/services/user-service';
import { toast } from 'sonner';
import { useSpinnerStore } from '~/state-management/spinner-store';
import { cn } from '~/lib/utils';

const UpdateProfileImage = ({ children }: { children: React.ReactNode }) => {
  //dialog open state
  const [open, setOpen] = useState(false);
  // image state
  const [image, setImage] = useState<File>(); // image file
  //drag state to indicate drag over
  const [drag, setDrag] = useState(false);
  //file input ref
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  // image upload progress state
  const [uploadProgress, setUploadProgress] = useState(0);
  //confirmation on the image upload
  const [confirmed, setConfirmed] = useState(false);
  //custom image upload hook
  const { mutate: uploadImageMutate } = useUploadImage();
  //get the custom user profile update hook
  const { mutate: updateUserDetailsMutate } = useUpdateUserDetails();
  //get the spinner state from the store
  const setSpinner = useSpinnerStore((state) => state.setShowSpinner);
  //get user profile custom hook
  const { refetch } = useGetUserDetails();
  // object URL for previews
  const [previewUrl, setPreviewUrl] = useState<string>();
  //handle image preview when image changes
  useEffect(() => {
    if (!image) {
      setPreviewUrl(undefined);
      return;
    }
    const url = URL.createObjectURL(image);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [image]);

  //unexpected error toast
  const handleUnexpectedError = (errorMessage = 'Something went wrong') => {
    //toast message for error
    toast.error(errorMessage, {
      classNames: {
        toast: '!bg-feedback-error',
      },
    });
  };

  //handle the selected image file
  const handleFiles = async (files: FileList | null) => {
    setUploadProgress(0);
    //check if file exists
    if (files && files.length > 0) {
      const file = files[0];

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

  // handles drag over for the drop image area
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(true);
  };

  //handle on drop
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  //handles Drag leave for the drop image area
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleConfirmImageUpload = () => {
    // check if image exists
    if (!image) return;
    setSpinner(true);
    // upload image
    uploadImageMutate(
      { file: image },
      {
        onSuccess: (data) => {
          // update the user profile
          updateUserDetailsMutate(
            {
              profileImg: data.data.url,
            },
            {
              onSuccess: () => {
                setConfirmed(true);
              },
              onError: (error) => {
                handleUnexpectedError(error?.response?.data.message);
              },
              onSettled: () => {
                // reset all state
                setOpen(false);
                setConfirmed(false);
                setImage(undefined);
                setUploadProgress(0);
                // refetch user details
                refetch();
                //push a toast message
                toast.success('Profile image updated successfully', {
                  classNames: {
                    toast: '!bg-feedback-success',
                  },
                });
                // set loading false
                setSpinner(false);
              },
            },
          );
        },
        onError: (error) => {
          handleUnexpectedError(error?.response?.data.message);
          setSpinner(false);
        },
      },
    );
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        // make sure to clear all state on esc or outside click
        if (!next) {
          setConfirmed(false);
          setImage(undefined);
          setUploadProgress(0);
        }
      }}
    >
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
              <Card
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  'border-ui-600 hover:border-ui-400 flex flex-col items-center justify-center gap-4 border-2 border-dashed bg-transparent transition-colors',
                  drag && 'border-brand-500 bg-brand-500/10',
                )}
              >
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
                      max={100} // set max to 100 since it's a percentage
                      value={uploadProgress}
                      className="border-ui-600 [&>*]:bg-brand-500 h-4 animate-pulse border bg-transparent"
                    />
                  </div>
                )}
              </Card>
            </>
          )}

          {/* show uploaded image with crop option */}
          {uploadProgress === 100 && !confirmed && previewUrl && (
            <Card className="border-ui-600 flex items-center justify-center border bg-transparent">
              <Image
                src={previewUrl}
                alt="profile image"
                width={500}
                height={700}
              />
              {/* buttons container  */}
              <div className="flex flex-row gap-2">
                <Button
                  variant={'outline'}
                  className="text-base-white"
                  onClick={() => {
                    setImage(undefined);
                    setUploadProgress(0);
                  }}
                >
                  Back
                </Button>
                <Button variant={'blue'} onClick={() => setConfirmed(true)}>
                  Continue
                </Button>
              </div>
            </Card>
          )}
          {/* show the final image in a avatar view  */}
          {confirmed && previewUrl && (
            <div className="flex flex-col items-center justify-center gap-3">
              <p className="text-ui-400">
                Perfect! Your profile image is ready
              </p>
              <Avatar>
                <AvatarImage
                  src={previewUrl}
                  className="border-ui-600 h-50 w-50 rounded-full border-3"
                />
                <AvatarFallback>
                  <ImageIcon className="text-ui-400 h-30 w-30 rounded-full" />
                </AvatarFallback>
              </Avatar>
              <div className="mt-5 flex flex-row gap-2">
                <Button
                  variant={'outline'}
                  onClick={() => setConfirmed(false)}
                  type="button"
                >
                  Back
                </Button>
                <Button
                  variant={'blue'}
                  onClick={handleConfirmImageUpload}
                  type="button"
                >
                  Use this image
                </Button>
              </div>
            </div>
          )}

          {/* file input hidden*/}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            hidden
            ref={fileInputRef}
            onChange={(e) => handleFiles(e.target.files)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfileImage;
