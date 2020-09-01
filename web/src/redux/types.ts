export interface Category {
  id: number;
  description: string;
  duration: number;
}

export interface JournalEntry {
  id?: number;
  date: string;
  categoryId: number;
  duration: number;
  title: string;
  notes: string;
}