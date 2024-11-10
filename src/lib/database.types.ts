export interface Database {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string;
          name: string;
          description: string;
          category: string;
          location: string;
          image: string;
          images?: string[];
          phone?: string;
          email?: string;
          website?: string;
          amenities?: string[];
          schedule?: Array<{ day: string; hours: string }>;
          created_at?: string;
          updated_at?: string;
        };
        Insert: {
          // ... insert types
        };
        Update: {
          // ... update types
        };
      };
    };
  };
} 