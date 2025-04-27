# React Boilerplate

A modern React boilerplate with Vite, Redux Toolkit, Formik, Tailwind CSS, and more.

## Features

- **React with Vite**: Fast and optimized development setup
- **Formik and Yup**: Form building and validation
- **Axios with Interceptors**: API calls with token injection and error handling
- **RTL and LTR Support**: Multilingual support with react-i18next (English and Arabic included)
- **Tailwind CSS**: Modern UI styling
- **Framer Motion**: Smooth animations and transitions
- **Redux Toolkit**: State management for authentication and UI
- **Public and Private Layouts**: Separate layouts for authenticated and unauthenticated users
- **Responsive Dashboard**: With charts, stats, and tabbed navigation

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/react-boilerplate.git
cd react-boilerplate
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── assets/          # Static assets like images
├── components/      # Reusable components
│   └── ui/          # UI components (Button, Card, etc.)
├── contexts/        # React contexts
├── hooks/           # Custom hooks
├── i18n/            # Internationalization
│   └── locales/     # Translation files
├── layouts/         # Layout components
│   ├── private/     # Private layout (with sidebar)
│   └── public/      # Public layout
├── pages/           # Page components
│   ├── auth/        # Authentication pages
│   └── dashboard/   # Dashboard pages
├── services/        # API services
├── store/           # Redux store
│   └── slices/      # Redux slices
└── utils/           # Utility functions
```

## Authentication

For demo purposes, the authentication is mocked. Use the following credentials:

- Email: `user@example.com`
- Password: `password`

## License

MIT
