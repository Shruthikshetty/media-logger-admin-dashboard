import React, { useState } from 'react';
import Cropper, { Area } from 'react-easy-crop';
import { Button } from './ui/button';
import { getCroppedImg } from '~/lib/image-resize';

interface ProfileImageCropProps {
  imageSrc: string; // preview image (could be object URL)
  onBack: () => void; // callback for user pressing back/cancel
  fileName?: string; // file name optional
  onCropComplete: (croppedFile: File) => void; // send the cropped file back
}

/**
 * A component to crop a profile image
 *
 * @param {string} imageSrc preview image (could be object URL)
 * @param {() => void} onBack callback for user pressing back/cancel
 * @param {(croppedFile: File) => void} onCropComplete send the cropped file back
 * @param {string} [fileName="cropped.jpg"] file name optional
 *
 * @returns a JSX.Element
 */
const ProfileImageCropper = ({
  imageSrc,
  onBack,
  onCropComplete,
  fileName = 'cropped.jpg',
}: ProfileImageCropProps) => {
  // crop state's
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropCompleteInternal = (_croppedArea: Area, areaPixels: Area) => {
    setCroppedAreaPixels(areaPixels);
  };
  const showCroppedImage = async () => {
    // return in case of no croppedAreaPixels
    if (!croppedAreaPixels) return;
    // use a utility to crop image from pixels and get a file/blob
    const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels); // utility needed
    const croppedFile = new File([croppedBlob], fileName, {
      type: 'image/jpeg',
    });
    onCropComplete(croppedFile);
  };

  return (
    <>
      <div className="relative h-[700px] max-h-[1000px] min-h-[500px] w-[90%] overflow-clip rounded-xl">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropCompleteInternal}
          onZoomChange={setZoom}
        />
      </div>
      <div className="flex flex-row gap-2">
        <Button
          variant={'outline'}
          className="text-base-white"
          onClick={onBack}
        >
          Back
        </Button>
        <Button variant={'blue'} onClick={showCroppedImage}>
          Continue
        </Button>
      </div>
    </>
  );
};

export default ProfileImageCropper;
