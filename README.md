# NoteVerse 📝

NoteVerse is a modern note-taking application that helps students and professionals organize their course notes and study materials in a clean, efficient, and collaborative way.

## ✨ Features

### Authentication & User Management
- User Registration and Login
- Secure Authentication with Supabase

### Note Management
- Create, Edit Notes
- Rich Text Editor Support
- File Attachments
- Course-based Organization
- Related Notes Suggestions
- Bookmarking System

### User Experience
- Modern, Responsive UI
- Dark Mode Support
- Real-time Updates
- Intuitive Navigation
- File Download Support
- Bookmark Management

## 🚀 Tech Stack

### Frontend
- React.js
- TailwindCSS
- Vite


### Backend & Database
- Supabase
  - Authentication
  - PostgreSQL Database
  - Storage

## 🔥 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Supabase account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shimieee/noteverse.git
cd noteverse
```

2. Install dependencies:
```bash
npm install
```

3. Set up Supabase:
- Create a new project in Supabase
- Enable Authentication with Email/Password
- Create the following tables in your database:
  - notes
  - bookmarks
- Set up Storage for file uploads
- Copy your Supabase configuration

4. Create a `.env` file in the root directory:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

5. Run the development server:
```bash
npm run dev
```

## 📁 Project Structure

```
NoteVerse/
├── src/
│   ├── assets/         # Static assets
│   ├── components/     # Reusable components
│   ├── pages/          # Page components
│   ├── sections/       # Section components
│   ├── App.jsx         # Main application component
│   ├── supabase.js     # Supabase configuration
│   └── main.jsx        # Application entry point
```

## 🛠️ Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

### Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📬 Contact

Feel free to reach out if you have any questions or suggestions!

- GitHub: [shimieee](https://github.com/shimieee)
- Email: c.iken@aui.ma

