import { useMemo, useState } from "react";
import MainHangMan from "./Hangman/mainHungMan";
import SpeedType from "./Speed-Typing/SpeedType";
import Todo from "./ToDo/Todo";
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { useLocalStorage } from "./Notes/useLocalStorage";
import { NoteList } from "./Notes/NoteList";
import { NewNote } from "./Notes/NewNote";
import { Note } from "./Notes/Note";
import { NoteLayout } from "./Notes/NoteLayout";
import { EditNote } from "./Notes/EditNote";
import { v4 as uuidV4 } from 'uuid';
import TicToc from "./components/TicToc";
export type Note = {
  id: string;
} & NoteDate;

export type RowNote = {
  id: string;
} & RowNoteDate;

export type RowNoteDate = {
  title: string,
  markdown: string,
  tagIds: string[]
};

export type NoteDate = {
  title: string,
  markdown: string,
  tags: Tag[]
};

export type Tag = {
  id: string,
  label: string
};

function App() {
  const [open, setOpen] = useState(false)
  const [isActive, setIsActive] = useState<number | null>(null)
  const links = [
    {
      title: 'Type Speed Game',
      url: 'type-speed-game'
    },
    {
      title: 'Hungman Game',
      url: 'hangman'
    },
    {
      title: 'ToDo',
      url: 'todo'
    },
    {
      title: 'Task Manager',
      url: 'task-manager'
    },
    {
      title: 'TicToc',
      url: 'tictoc'
    }
  ]
  const [notes, setNotes] = useLocalStorage<RowNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteDate) => {
    setNotes(prevNotes => [
      ...prevNotes,
      { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) },
    ]);
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteDate) => {
    setNotes(prevNotes =>
      prevNotes.map(note =>
        note.id === id ? { ...note, ...data, tagIds: tags.map(tag => tag.id) } : note
      )
    );
  };

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const addTag = (tag: Tag) => {
    setTags(prevTags => [...prevTags, tag]);
  };

  const onUpdateTag = (id: string, label: string) => {
    setTags(prevTags =>
      prevTags.map(tag => (tag.id === id ? { ...tag, label } : tag))
    );
  };

  const onDeleteTag = (id: string) => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id));
  };

  return (

    <div className="">
      {open === false && <button className="p-3  absolute top-3 left-3 w-11 hover:bg-slate-800 bg-black rounded flex flex-col gap-y-1" onClick={() => setOpen(true)}><span className="w-full bg-white h-[2px]"></span><span className="w-full bg-white h-[2px]"></span><span className="w-full bg-white h-[2px]"></span></button>}
      {open && (
        <div className={`absolute z-10 transition-all duration-500 left-0 top-0 grid ${open ? 'grid-rows-1' : 'grid-rows-[0]'}`}>
          <button className=" absolute flex items-center justify-center top-3 left-36 size-10 hover:bg-slate-800 bg-black rounded text-white text-3xl font-bold" onClick={() => setOpen(false)}>&times;</button>
          <div className="w-[200px] bg-slate-600 flex flex-col gap-y-3  pl-2 h-svh pt-24">
            {links.map((item, id) => {
              return (
                <Link key={id} to={item.url} className="p-2 w-[180px] rounded bg-slate-800 text-slate-400 hover:text-white" style={{ color: isActive === id ? 'white' : '' }} onClick={() => setIsActive(id)}>{item.title}</Link>
              )
            })}
          </div>
        </div>
      )}

      <Routes>
        <Route path='/' element={<SpeedType />} />
        <Route path='/type-speed-game' element={<SpeedType />} />
        <Route path='/tictoc' element={<TicToc />} />
        <Route path='/hangman' element={<MainHangMan />} />
        <Route path='/todo/*' element={<Todo />} />
        <Route
          path='/task-manager'
          element={
            <NoteList
              notes={notesWithTags}
              availableTags={tags}
              onUpdateTag={onUpdateTag}
              onDeleteTag={onDeleteTag}
            />
          }
        />
        <Route
          path='/task-manager/new'
          element={
            <NewNote
              availableTags={tags}
              onSubmit={onCreateNote}
              onAddTag={addTag}
            />
          }
        />
        <Route path='/task-manager/:id' element={<NoteLayout notes={notesWithTags} />}>
          <Route index element={<Note onDelete={onDeleteNote} />} />
          <Route
            path='edit'
            element={
              <EditNote
                availableTags={tags}
                onSubmit={onUpdateNote}
                onAddTag={addTag}
              />
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App;

