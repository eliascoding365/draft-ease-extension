import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import SaveButton from '../SaveButton';
import styled from 'styled-components';

interface NoteValues {
  title: string;
  noteBody: string;
}

const FormContainer =  styled.div `
  max-height: 446px;
`

const TextArea = styled.textarea `
  margin: 6px 2px 2px 2px;
  background-color: transparent;
  font-size: 14px;
  line-height: 1.5rem ;
  color: white;
  border-style: none;
  outline: 2px solid transparent;
  outline-offset: 2px;
  width: 100%;
  resize: none;
`

const TitleInput = styled.input `
  margin: 14px 2px 2px 2px;
  background-color: transparent;
  font-size: 1.5rem;
  color: white;
  border-style: none;
  outline: 2px solid transparent;
  width: 100%;
`

const NoteBlock: React.FC = () => {
  const { handleSubmit, setValue, register, reset, formState: { errors } } = useForm<NoteValues>({
    defaultValues: {
      title: '',
      noteBody: '',
    }
  });

  useEffect(() => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['drafts'], (result) => {
        const drafts = result.drafts || [];
        if (drafts.length > 0) {
          const lastDraft = drafts[drafts.length - 1];
          setValue('title', lastDraft.title);
          setValue('noteBody', lastDraft.noteBody);
        }
      });
    } else {
      console.error('Chrome API is not available.');
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<NoteValues> = (data) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      chrome.storage.local.get(['drafts'], (result) => {
        const drafts = result.drafts || [];
        drafts.push(data);
        chrome.storage.local.set({ drafts }, () => {
          console.log('Data saved', data);
          reset();
        });
      });
    } else {
      console.error('Chrome API is not available.');
    }
  };

  return (
    <FormContainer >
      <form
        className='mx-3'
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TitleInput
            {...register('title', { required: 'Title is required' })}
            type="text"
            placeholder='Create title' />
          {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}

          <TextArea
            {...register('noteBody', { required: 'Note body is required' })}
            rows={11}
            placeholder='Note...' />
          {errors.noteBody && <p className="text-red-500 text-xs">{errors.noteBody.message}</p>}
        </div>
        <div className="flex justify-end items-end mr-3 ">
          <SaveButton />
        </div>
      </form>
    </FormContainer>
  );
}

export default NoteBlock;
