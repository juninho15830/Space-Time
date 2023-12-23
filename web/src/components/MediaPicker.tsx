'use client'

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

export function MediaPicker() {
  const [preview, setPreview] = useState< 
    
    {
      src: string;
      type: 'image' | 'video';
    }
    | null
  >(null);
  
  const onFileSelected = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target; 
    
    if (!files || !files.length) {
      return;
    }

    setPreview({
      src: URL.createObjectURL(files[0]),
      type: new RegExp(/^video\/[a-zA-Z]+/).test(files[0].type)
        ? 'video'
        : 'image',
    });
  };

  return (
    <>
      <input
        accept={'image/*,video/*'} 
        className="invisible h-0 w-0"
        name="coverUrl"
        id="media"
        onChange={onFileSelected}
        type="file"
      />

      {!!preview &&
        (preview.type === 'video' ? (
          <video
            controls
            className="aspect-video w-full rounded-lg object-cover"
            src={preview.src}
          />
        ) : (
          <Image
            alt="Media preview"
            className="aspect-video w-full rounded-lg object-cover"
            height={280}
            src={preview.src}
            width={1000}
          />
        ))}
    </>
  );
};