import Note from "./Note.model";

interface Topic {
  id: number;
  name: string;
  notes: Note[];
}

export default Topic;
