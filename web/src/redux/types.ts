export interface Category {
  id: number;
  description: string;
  duration: number;
}

export interface JournalEntry {
  date: Date;
  categoryId: number;
  duration: number;
  title: string;
  notes: string;
}