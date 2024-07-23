import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import SaveButton from '../SaveButton';

interface NoteValues {
  title: string;
  noteBody: string;
}

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
    <div >
      <form
        className='m-4'
        onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register('title', { required: 'Title is required' })}
            type="text"
            className='
              py-1 px-3 bg-transparent text-2xl
              text-white border-none outline-none
              w-full'
            placeholder='Create title' />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          <textarea
            {...register('noteBody', { required: 'Note body is required' })}
            rows={9}
            className='
              py-1 px-3 bg-transparent text-lg
              text-white border-none 
              outline-none w-full resize-none'
            placeholder='Note...' />
          {errors.noteBody && <p className="text-red-500">{errors.noteBody.message}</p>}
        </div>
        <div className="flex justify-end mt-5 mr-3 ">
          <SaveButton />
        </div>
      </form>
    </div>
  );
}

export default NoteBlock;
