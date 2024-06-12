import { useMemo, useState } from 'react'
import { Tag } from './MainNote'
import { Link } from 'react-router-dom'
import ReactSelect from "react-select"
type HusseinNote = {
  tags: Tag[]
  title: string
  id: string
}
type NoteListProps = {
  availableTags: Tag[]
  notes: HusseinNote[]
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

type EditTagsModal = {
  show: boolean
  availableTags: Tag[]
  handleClose: () => void
  onDeleteTag: (id: string) => void
  onUpdateTag: (id: string, label: string) => void
}

export function NoteList({ availableTags, notes, onDeleteTag, onUpdateTag }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([])
  const [title, setTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  // start functionalty
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === '' || note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 || selectedTags.every(tag =>
          note.tags.some(noteTag => noteTag.id === tag.id)))
      )
    })
  }, [title, selectedTags, notes])
  return (
    <div className="bg-slate-400 h-svh">
    <div className='container p-4 mx-auto lg:w-[1100px]'>
        <h1 className='font-bold text-3xl text-center mb-5'>Notes</h1>
      <div className='flex justify-end pt-3 items-center p-2'>
        <div>
          <Link to='/task-manager/new'>
            <button className='bg-blue-600 hover:text-slate-400 mx-2 py-[5px] px-2 text-slate-200 rounded'>Create</button>
          </Link>
          <button className='border hover:text-blue-700 border-black p-1 rounded' onClick={() => setIsOpen(true)}>Edit Tags</button>
        </div>
      </div>
      <div className='grid grid-cols-2 gap-x-4 items-center lg:w-[900px] mx-auto'>
        <div className='mr-3'>
          <label className='block font-bold' htmlFor='in'>Title </label>
          <input className='p-1 w-full outline-none' id='in' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className=''>
          <label className='block font-bold'>Tags</label>
          <ReactSelect
            value={selectedTags.map(tag => {
              return { label: tag.label, value: tag.id }
            })}
            options={availableTags.map(tag => {
              return { label: tag.label, value: tag.id }
            })}
            onChange={tags => {
              setSelectedTags(tags.map(tag => {
                return { label: tag.label, id: tag.value }
              }))
            }}
            isMulti
          />
        </div>

      </div>
      <div className='grid  grid-cols-2 lg:grid-cols-3 justify-items-center mt-6'>
        {filteredNotes.map(note => (
          <div className=''>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
      <EditTagsModal
        onUpdateTag={onUpdateTag}
        onDeleteTag={onDeleteTag}
        show={isOpen}
        handleClose={() => setIsOpen(false)}
        availableTags={availableTags}
      />
    </div>
    </div>
  )
}


function NoteCard({ id, title, tags }: HusseinNote) {
  return (
    <Link to={`/task-manager/${id}`}>
      <div className='p-3 rounded mt-2 hover:drop-shadow-xl bg-slate-200 shadow size-40 lg:size-64'>
        <h1 className='font-bold text-lg text-center'>{title}</h1>
        {tags.length > 0 && (
          <div className='flex flex-wrap'>
            {tags.map(tag => (
              <div className='bg-blue-500 text-slate-100 p-1 rounded w-fit m-1' key={tag.id}>
                {tag.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}

function EditTagsModal({
  availableTags,
  handleClose,
  show,
  onDeleteTag,
  onUpdateTag
}: EditTagsModal) {
  return (
    show &&
    <div className='absolute min-h-svh top-0 left-0  w-full bg-opacity-40 bg-black'>
      <div className={`${show ? 'block' : 'hidden'} absolute top-[20%] -translate-y-[50%] -translate-x-[50%]  w-[330px] md:w-[380px] left-[50%] p-2 bg-white rounded `}>
        <div className='flex mb-5 justify-between p-1 pb-2 border-b-2 border-slate-400'>
          <h1 className="text-xl font-semibold">Edit Tags</h1>
          <button onClick={ handleClose} type="button" className="cursor-pointer text-2xl font-bold" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div>
          {availableTags.map(tag => (
            <div className='flex items-center my-2 w-full'>
              <div className='w-full'>
                <input className='w-full rounded-sm p-1 bg-transparent border border-gray-400' type='text' value={tag.label}
                  onChange={e => onUpdateTag(tag.id, e.target.value)} />
              </div>
              <div>
                <button className='ml-4 mr-2 size-8 text-lg flex items-center justify-center rounded-dm font-bold border border-slate-500' onClick={() => onDeleteTag(tag.id)}>&times;</button>
              </div>
            </div>
          ))}
        </div>
        <button onClick={handleClose} className='bg-blue-600 ml-auto block hover:bg-blue-700 text-slate-100 p-2 px-3 rounded mt-4'>Close</button>
      </div>
    </div>
        
  )
}