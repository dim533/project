export interface Listing {
  id: number;
  name: string;
  image: string;
  location: string;
  category: string;
  description?: string;
  amenities?: string[];
  schedule?: { day: string; hours: string }[];
}

export const listings: Listing[] = [
  {
    id: 1,
    name: "Elite Fitness Center",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    location: "Downtown",
    category: "Strength Training",
    description: "State-of-the-art fitness center featuring the latest equipment and expert trainers.",
    amenities: ["24/7 Access", "Personal Training", "Group Classes", "Sauna", "Parking"],
    schedule: [
      { day: "Monday-Friday", hours: "5:00 AM - 11:00 PM" },
      { day: "Saturday-Sunday", hours: "7:00 AM - 9:00 PM" }
    ]
  },
  // ... other listings
]; 