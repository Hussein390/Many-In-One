import { NoteForm } from './NoteForm'
import { useNote } from './NoteLayout'
import { NoteDate, Tag } from './MainNote'
type EditNoteProps = {
  onSubmit: (id: string, data: NoteDate) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}

export function EditNote({ onAddTag, onSubmit, availableTags }: EditNoteProps) {
  const note = useNote()
  return (
    <div className="bg-slate-500 h-svh">
    <div className='pt-6 lg:w-[1100px] container px-4 mx-auto'>
      <h1 className='text-2xl font-bold'>Edit Note</h1>
      <NoteForm
        tags={note.tags}
        markdown={note.markdown}
        title={note.title}
        onAddTag={onAddTag}
        onSubmit={data => onSubmit(note.id, data)}
        availableTags={availableTags}
      />
    </div>
    </div>
  )
}


