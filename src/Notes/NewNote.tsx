import { NoteDate, Tag } from "./MainNote"
import { NoteForm } from "./NoteForm"
type NewNoteProps = {
  onSubmit: (data: NoteDate) => void
  onAddTag: (tag: Tag) => void
  availableTags: Tag[]
}
export function NewNote({onAddTag, onSubmit, availableTags}: NewNoteProps) {
  return (
    <div className="bg-slate-500 h-screen">
      <h1 className="font-bold text-2xl pt-2 text-center">New Note</h1>
      <NoteForm 
        onAddTag={onAddTag}
        onSubmit={onSubmit}
        availableTags={availableTags}
      />
    </div>
  )
}

