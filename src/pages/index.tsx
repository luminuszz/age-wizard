/* eslint-disable jsx-a11y/label-has-associated-control */
import { SubmitHandler, FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { NextPage } from 'next';
import React, { useCallback, useRef, useState } from 'react';

import InputFile, { ImperativeProps } from '../components/inputFile';

const Home: NextPage = () => {
  const inputFileImperativeRefReceptor = useRef<ImperativeProps>(null);
  const formRef = useRef<FormHandles>(null);
  const [preview, setPreview] = useState<string>();

  const handleSubmit = useCallback(() => {
    const path = inputFileImperativeRefReceptor.current.previewImg;

    setPreview(path);
  }, [inputFileImperativeRefReceptor]);

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container">
          <div className="title">O Mago da idade</div>
          <div className="box">
            <Form ref={formRef}>
              <label htmlFor="file">
                <InputFile name="file" ref={inputFileImperativeRefReceptor} />
              </label>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
