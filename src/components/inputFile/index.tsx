/* eslint-disable no-param-reassign */
/* eslint-disable react-hooks/rules-of-hooks */
import { useField } from '@unform/core';
import React, {
  ChangeEvent,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

interface InputFileProps {
  name: string;
}

type InputProps = JSX.IntrinsicElements['input'] & InputFileProps;

export interface ImperativeProps {
  previewImg: string;
}

const InputFile: React.ForwardRefRenderFunction<ImperativeProps, InputProps> = (
  { name, ...rest },
  ref,
) => {
  const { defaultValue, fieldName, registerField } = useField(name);
  const [previewImg, setPreviewImg] = useState<string>(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePreview = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const currentFile = e.target.files?.[0];

    if (currentFile) {
      setPreviewImg(null);
    }

    const previewImgUrl = URL.createObjectURL(currentFile);

    setPreviewImg(previewImgUrl);
  }, []);

  useImperativeHandle(ref, () => ({
    previewImg,
  }));

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'files[0]',
      clearValue(inputTypeRef: HTMLInputElement) {
        inputTypeRef.value = '';
      },
      setValue(_: HTMLInputElement, value: string) {
        setPreviewImg(value);
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      {previewImg && <img src={previewImg} alt="Preview" width="100" />}
      <input
        type="file"
        onChange={handlePreview}
        name={name}
        ref={inputRef}
        {...rest}
      />
    </>
  );
};

export default forwardRef(InputFile);
