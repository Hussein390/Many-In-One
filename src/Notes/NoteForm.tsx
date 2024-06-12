import { FormEvent, useRef, useState } from 'react'
import { Tag, NoteDate } from './MainNote'
import { Link, useNavigate } from 'react-router-dom'
import CreatableReactSelect from "react-select/creatable"
import { v4 as uuidV4 } from "uuid"


type NoteFormProps = {
  onSubmit: (data: NoteDate) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
} & Partial<NoteDate>

export function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null)
  const markdownRef = useRef<HTMLTextAreaElement>(null)
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags)
  const navigate = useNavigate()


  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    })
    navigate('/task-manager')
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className='flex lg:w-[700px] mx-auto justify-center flex-col sm:flex-row gap-y-4 items-center mt-5'>
        <div className='w-[45%] mr-6'>
          <label className='font-bold block text-slate-200'>Title </label>
          <input className='p-1  font-bold outline-none' type='text' required defaultValue={title} ref={titleRef} />
        </div>
        <div className='w-[219px] ml-9 sm:m-0'>
          <h2 className='font-bold  text-slate-200'>Tags</h2>
          <CreatableReactSelect
            onCreateOption={label => {
              const newTag = { id: uuidV4(), label }
              onAddTag(newTag)
              setSelectedTags(prev => [...prev, newTag])
            }}
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
      <div className='lg:w-[700px] mx-auto mt-5'>
        <label className='font-bold block mb-1 text-slate-200'>Body</label>
        <textarea defaultValue={markdown}
          required
          ref={markdownRef}
          rows={14}
          className='w-full p-2 font-semibold outline-none bg-slate-100 resize-none' />
        <div className=' flex gap-3 mt-3 justify-end'>
          
          <button  className='bg-slate-400 hover:bg-slate-700 text-slate-50 font-bold p-2 rounded'>Save</button>
          
          <Link to='/task-manager'>
            <button className='bg-red-700 hover:bg-red-600 text-slate-200 font-bold p-2 rounded'>Cancel</button>
          </Link>
        </div>
      </div>
    </form >
  )
}

