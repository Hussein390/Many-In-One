import { Link, useNavigate } from 'react-router-dom'
import ReactMarkdown from "react-markdown"
import { useNote } from "./NoteLayout"
type NoteProps = {
  onDelete: (id: string) => void
}
export function Note({ onDelete }: NoteProps) {
  const note = useNote()
  const navigate = useNavigate()
  return (
    <div className="bg-slate-300 h-svh">
    <div className='container lg:w-[1100px] px-4 mx-auto  relative'>
      <div className='py-3 mb-6'>
        <div>
          <h1 className='font-bold text-2xl'>{note.title}</h1>
          {note.tags.length > 0 && (
            <div className='flex flex-wrap'>
              {note.tags.map(tag => (
                <div className='bg-blue-500 text-xs text-slate-100 p-1 rounded w-fit m-1' key={tag.id}>
                  {tag.label}
                </div>
              ))}
            </div>)}
        </div>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>

        <div className='flex items-start gap-x-2 mt-12'>
          <Link to={`/task-manager/${note.id}/edit`}>
            <button className='bg-blue-600 hover:bg-blue-700 text-slate-100 p-2 px-3 rounded'>Edit</button>
          </Link>
          <button onClick={() => {
            onDelete(note.id)
            navigate('/task-manager')
          }} className='border-2 hover:text-red-600 border-slate-400 p-2 rounded'>Delete</button>
          <Link to={`/task-manager`} className='absolute bottom-2 right-3'>
            <button className='border-2 hover:text-blue-600 border-slate-400 p-2 rounded'>Back</button>
          </Link>
        </div>
      </div>
    </div>
    </div>
  )
}

