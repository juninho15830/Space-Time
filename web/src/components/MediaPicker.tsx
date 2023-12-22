'use client'

import Image from 'next/image';
import { ChangeEvent, useState } from 'react';

type Props = {
  id?: string;
  name?: string;
};

export const MediaPicker = ({ id = 'media', name = 'media' }: Props) => {
  const [preview, setPreview] = useState<
    | {
        src: string;
        type: 'image' | 'video';
      }
    | undefined
  >();

  const onFileSelected = (evt: ChangeEvent<HTMLInputElement>) => {
    const { files } = evt.target;

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
        id={id}
        name={name}
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