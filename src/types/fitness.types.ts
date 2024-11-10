export interface CategoryItem {
  id: string;
  name: string;
  icon: string;
  description?: string;
}

export interface FitnessState {
  categories: CategoryItem[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
} 