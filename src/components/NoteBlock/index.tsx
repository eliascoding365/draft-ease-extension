
const NoteBlock = () => {
  return (
    <div >
        <div>
            <input
                type="text" 
                className='
                py-1 px-3 bg-transparent text-2xl
                text-white border-none outline-none
                w-full' 
                placeholder='Create title' />
            <textarea 
                rows={10}
                className='
                py-1 px-3 bg-transparent text-lg
                text-white border-none 
                outline-none w-full resize-none' 
                placeholder='Note...' />
        </div>
    </div>
  )
}

export default NoteBlock