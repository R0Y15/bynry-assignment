# Bynry Profile Management System

A modern web application for managing user profiles with interactive maps and real-time search capabilities.

# Admin Credentials
[View Credentials](https://drive.google.com/file/d/1ZA2LQaXrQ2DKVvZtIgIeNkyzdSZ0FHbg/view?usp=sharing)


## ✨ Features

- 🗺️ **Interactive Map Integration**
  - View profile locations on an interactive map
  - Real-time geocoding of addresses
  - Customizable map markers

- 👤 **Profile Management**
  - Create, edit, and delete user profiles
  - Upload profile avatars
  - Manage contact information
  - Fallback avatars with initials

- 🔍 **Advanced Search & Filtering**
  - Real-time search functionality
  - Filter by name, location, and contact info
  - Paginated results for better performance

- 🎨 **Modern UI/UX**
  - Responsive design for all devices
  - Beautiful animations and transitions
  - Accessible components
  - Dark mode support

- 🔒 **Secure Admin Panel**
  - Protected admin routes
  - JWT authentication
  - Role-based access control

## 🚀 Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bynry.git
   cd bynry
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=your_endpoint_url
   ```

4. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework**: [Next.js 13](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Maps**: [Leaflet](https://leafletjs.com/)
- **State Management**: React Hooks
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Authentication**: JWT with HTTP-only cookies

## 📱 Features in Detail

### Profile Management
- Create and edit user profiles
- Upload and manage profile avatars
- Automatic fallback to initials when no avatar is present
- Real-time form validation
- Responsive image handling

### Map Integration
- Interactive map display
- Automatic geocoding of addresses
- Custom map markers
- Clustered markers for multiple profiles
- Zoom and pan controls

### Search & Filtering
- Real-time search functionality
- Multiple filter criteria
- Paginated results (20 per page)
- Optimized performance
- Keyboard navigation support

### Admin Panel
- Secure authentication
- Profile management interface
- Bulk actions support
- Activity logging
- User-friendly dashboard

## 🔐 Security Features

- Protected API routes
- JWT authentication
- CSRF protection
- Rate limiting
- Input sanitization

### Endpoints

#### Profiles
- `GET /profileDetails` - List all profiles
- `GET /profileDetails/:id` - Get a specific profile
- `POST /profileDetails` - Create a new profile
- `PUT /profileDetails/:id` - Update a profile
- `DELETE /profileDetails/:id` - Delete a profile