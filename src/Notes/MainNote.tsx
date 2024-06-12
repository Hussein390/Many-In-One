

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
