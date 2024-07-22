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
      chrome.storage.local.get(['title', 'noteBody'], (result) => {
        if (result.title) setValue('title', result.title);
        if (result.noteBody) setValue('noteBody', result.noteBody);
      });
    } else {
      console.error('Chrome API is not available.');
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<NoteValues> = (data) => {
    if (typeof chrome !== 'undefined' && chrome.storage) {
      console.log('Saving data:', data);
      chrome.storage.local.set(data, () => {
        console.log('Data saved');
        reset();
      });
    } else {
      console.error('Chrome API is not available.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            rows={10}
            className='
              py-1 px-3 bg-transparent text-lg
              text-white border-none 
              outline-none w-full resize-none'
            placeholder='Note...' />
          {errors.noteBody && <p className="text-red-500">{errors.noteBody.message}</p>}
        </div>
        <div className="flex justify-end">
          <SaveButton />
        </div>
      </form>
    </div>
  );
}

export default NoteBlock;
