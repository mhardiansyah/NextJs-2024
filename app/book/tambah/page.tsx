"use client";
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import useBookModule from '../lib'
import {Form, useFormik, FormikProvider} from "formik"
import * as yup from "yup"
import { title } from 'process';
import { BookCreatePayload } from '../interface';
import InputText from '@/txt/TextInput';
import Label from '@/components/Label';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

const createBookSchema = yup.object().shape({
  title: yup.string().nullable().default("").required("Wajib diisi"),
  author: yup.string().nullable().default("").required("Wajib diisi"),
  year: yup.number().nullable().default(undefined).min(2018,"minimal tahun 2018").max(2025, "maksimal tahun 2025").required("Wajib pilih"),
  deskripsi: yup.string().nullable().default(""),
})

const TambahBook = () => {


    const {useCreateBook} = useBookModule();
    const router = useRouter();

    const mutate = useCreateBook();

    const formik = useFormik<BookCreatePayload>({
      initialValues: createBookSchema.getDefault() ,
      // initialValues: {
      //   title: "",
      //   author: "",
      //   year: undefined,
      //   deskripsi: "",
      // } ,
      validationSchema: createBookSchema,
      enableReinitialize: true,
      onSubmit : (values) => {
        mutate.mutate(values, {
          onSuccess: () => {
            resetForm();
            setValues(createBookSchema.getDefault());
            router.push("/book");
          }
        })
        console.log("Berhasil Submit", values);
      }
    });

    const { handleChange, handleSubmit, setFieldValue, handleBlur, values, errors, resetForm, setValues} = formik

  return (
    <section className=' flex flex-col items-center justify-center w-full h-full'>
      <h2>Tambah buku</h2>

      {JSON.stringify(values)}
      <p>==============================</p>
      {JSON.stringify(errors)}

      <FormikProvider value={formik}>
        <form className='space-y-4' onSubmit={handleSubmit}>
          <section>
            <Label htmlFor='title' title='Judul' />
            <InputText value={values.title} placeholder='Judul buku' id='title' name='title' onChange={handleChange} onBlur={handleBlur} isError={!!errors.title} messageError={errors.title} />
          </section>
          <section>
          <Label htmlFor='author' title='Penulis' />
          <InputText value={values.author} placeholder='Nama penulis' id='author' name='author' onChange={handleChange} onBlur={handleBlur} isError={!!errors.author} messageError={errors.author} />
          </section>
          <section>
          <Label htmlFor='deskripsi' title='Deskripsi' />
          <InputText value={values.deskripsi} placeholder='Deskripsi buku' id='deskripsi' name='deskripsi' onChange={handleChange} onBlur={handleBlur} isError={!!errors.deskripsi} messageError={errors.deskripsi} />
          </section>
          <section>
          <Label htmlFor='year' title='Year' />
          <InputText value={values.year} placeholder='Tahun Buku' id='year' name='year' onChange={handleChange} onBlur={handleBlur} isError={!!errors.year} messageError={errors.year} />
          </section>
          <section>
            <Button isLoading={mutate.status === 'pending'}  title='Submit' colorSchema='blue' type = 'submit' variant='solid' />
          </section>
        </form>
      </FormikProvider>
    </section>
  )
}

export default TambahBook