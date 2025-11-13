export type Course = 'Starters' | 'Mains' | 'Desserts';

export interface MenuItemType {
  id: string;
  name: string;
  description: string;
  price: number;
  course: Course;
}
