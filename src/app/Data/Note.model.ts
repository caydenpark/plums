interface Note {
  id: number;
  topic_id: number;
  title: string;
  content: string;
  date_added: Date;
  created_at: Date;
}

export default Note;
