import Note from "./Note.model";

export interface Subtopic {
  id: number;
  name: string;
}

export interface Topic {
  id: number;
  name: string;
  notes: Note[];
  subtopics: Subtopic[];
}


