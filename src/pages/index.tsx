/* eslint-disable jsx-a11y/label-has-associated-control */
import { FormHandles, SubmitHandler } from '@unform/core';
import { Form } from '@unform/web';
import { NextPage } from 'next';
import React, { useCallback, useRef, useState } from 'react';

import InputFile, { ImperativeProps } from '../components/inputFile';
import Spinner from '../components/Spinner';
import api from '../services/api';

type ageData = {
  ageRange: {
    max: number;
    min: number;
  };
  confidence: number;
};

interface FormRequest {
  file: File;
}

const Home: NextPage = () => {
  const inputFileImperativeRefReceptor = useRef<ImperativeProps>(null);
  const formRef = useRef<FormHandles>(null);
  const [preview, setPreview] = useState<string>(
    'https://i.ytimg.com/vi/m6ireqczuqw/maxresdefault.jpg',
  );
  const [hasImage, setasImage] = useState(false);
  const [load, setLoad] = useState(false);
  const [age, setAge] = useState<ageData[]>([]);

  const handleSubmit: SubmitHandler<FormRequest> = useCallback(
    async ({ file }) => {
      try {
        setAge([]);
        setLoad(true);

        const data = new FormData();

        data.append('image', file);
        const { data: values } = await api.patch<ageData[]>('/age', data);

        setAge(values);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoad(false);
      }
    },

    [],
  );

  const subimitForm = useCallback(() => {
    formRef.current.submitForm();
    const img: File = formRef.current.getFieldValue('file');

    const formtedImg = URL.createObjectURL(img);

    console.log(formtedImg);

    setPreview(formtedImg);
  }, []);

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="container is-flex">
          <div className="title is-size-1">O Mago da idade</div>
          <figure className="image">
            <img src={preview} alt="" />
          </figure>
          <div className="box mt-5">
            <Form ref={formRef} onSubmit={handleSubmit}>
              <label className="inputFileLabel" htmlFor="file">
                <Spinner visibility={Number(load)} text="Envie uma imagem" />
                <InputFile
                  disabled={load}
                  name="file"
                  id="file"
                  className="is-hidden"
                  ref={inputFileImperativeRefReceptor}
                  onChange={subimitForm}
                />
              </label>
            </Form>
          </div>

          <div className="content">
            {age && (
              <>
                <h2>Resultados</h2>
                {age.map(value => (
                  <p>
                    Parece que Esta pessoa tem a idade entre
{' '}
                    {value.ageRange.min}
{' '}
e{value.ageRange.max}
{' '}
anos{' '}
                  </p>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;

/*

*/
