# National Tax Law Associates - Frontend

A modern React frontend for the National Tax Law Associates website, featuring a responsive landing page, blog system, and admin dashboard.

## Tech Stack

- **React 19** - UI framework
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Router v6** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

## Prerequisites

- Node.js >= 18.x
- Backend API running on port 5000

## Installation

1. Navigate to frontend folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

## Environment Variables

```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner

## Project Structure

```
frontend/src/
├── components/
│   ├── admin/
│   │   └── AdminLayout.js     # Admin dashboard layout
│   ├── animations/
│   │   └── AnimationWrappers.js
│   ├── common/
│   │   ├── LoadingSpinner.js
│   │   └── ProtectedRoute.js
│   ├── layout/
│   │   ├── Header.js          # Navigation
│   │   ├── Footer.js
│   │   └── Layout.js
│   └── sections/
│       ├── Hero.js            # Landing hero
│       ├── About.js
│       ├── Services.js        # 8 service cards
│       ├── ConsultationForm.js # File upload form
│       ├── Newsletter.js
│       └── BlogPreview.js
├── context/
│   └── AuthContext.js         # Authentication state
├── hooks/
│   ├── useForm.js
│   └── useScrollAnimation.js
├── pages/
│   ├── Home.js
│   ├── Blog.js
│   ├── BlogDetail.js
│   └── admin/
│       ├── Login.js
│       ├── Dashboard.js
│       ├── BlogList.js
│       ├── BlogEditor.js
│       ├── Consultations.js
│       └── Subscribers.js
├── services/
│   ├── api.js                 # Axios instance
│   ├── authService.js
│   ├── blogService.js
│   ├── consultationService.js
│   └── newsletterService.js
├── App.js                     # Routes config
├── index.js
└── index.css                  # Tailwind + custom styles
```

## Features

### Public Pages
- **Home** - Landing page with hero, about, services, consultation form, newsletter, blog preview
- **Blog** - Blog listing with category filtering and pagination
- **Blog Detail** - Individual blog post with social sharing

### Admin Dashboard
- **Dashboard** - Statistics and quick actions
- **Blog Management** - Create, edit, delete blog posts
- **Consultations** - View and manage client requests
- **Subscribers** - Newsletter subscriber management

## Color Scheme

- **Primary (Gold):** #D4A00A
- **Secondary (Dark):** #1A1A1A
- **Fonts:** Inter (body), Poppins (headings)

## Routes

| Path | Component | Description |
|------|-----------|-------------|
| `/` | Home | Landing page |
| `/blog` | Blog | Blog listing |
| `/blog/:id` | BlogDetail | Single blog post |
| `/admin/login` | Login | Admin login |
| `/admin` | Dashboard | Admin dashboard |
| `/admin/blogs` | BlogList | Blog management |
| `/admin/blogs/new` | BlogEditor | Create blog |
| `/admin/blogs/:id` | BlogEditor | Edit blog |
| `/admin/consultations` | Consultations | View requests |
| `/admin/subscribers` | Subscribers | Newsletter subs |

## License

MIT
