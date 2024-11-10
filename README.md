# FitFinder

FitFinder is a modern web application that connects fitness enthusiasts with gyms, studios, and personal trainers in their area. Built with React, TypeScript, and Supabase, it provides a seamless experience for both fitness seekers and providers.

## Features

- 🔍 Advanced search functionality for gyms and trainers
- 📍 Location-based recommendations
- 💪 Detailed profiles for fitness providers
- 🗓️ Real-time availability and booking
- 📱 Fully responsive design
- 🔒 Secure authentication and data handling

## Tech Stack

- **Frontend:** React, TypeScript, Tailwind CSS
- **State Management:** React Context
- **Backend & Auth:** Supabase
- **Routing:** React Router
- **UI Components:** Custom components with Tailwind
- **Icons:** Lucide React
- **Testing:** Vitest
- **Build Tool:** Vite

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Lint code

## Project Structure

```
src/
├── components/     # Reusable UI components
├── contexts/      # React contexts
├── hooks/         # Custom hooks
├── lib/           # Utilities and constants
├── pages/         # Page components
├── services/      # API services
└── types/         # TypeScript types
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## License

MIT License - feel free to use this project for your own purposes.

## Support

For support, email support@fitfinder.com or open an issue in the repository.