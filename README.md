# Theme Demo

A beautiful demonstration of dynamic theming with React, TypeScript, and Tailwind CSS. This project showcases a sophisticated theme system that allows real-time theme switching with smooth transitions and CSS custom properties.

## ✨ Features

- **Dynamic Theme Switching**: Real-time theme changes with smooth transitions
- **CSS Custom Properties**: Uses CSS variables for efficient theme management
- **TypeScript**: Fully typed for better development experience
- **Tailwind CSS**: Modern utility-first CSS framework
- **Responsive Design**: Mobile-first responsive layout using CSS Grid
- **Theme Context**: React Context API for global theme state management
- **Transition Animations**: Smooth loading transitions between themes
- **Contrast Calculation**: Automatic text color calculation based on background luminance

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd theme-demo
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Theme System

The theme system is built around CSS custom properties and provides:

### Theme Structure

```typescript
interface Theme {
  primaryColor: string; // Primary brand color
  secondaryColor: string; // Secondary brand color
  backgroundColor: string; // Main background color
  textColor: string; // Main text color (auto-calculated)
}
```

### Key Components

- **ThemeProvider**: Global theme context provider
- **ThemeControls**: UI for theme switching and customization
- **TokenConsumerCard**: Demonstrates theme token consumption
- **StatefulConsumerCard**: Shows stateful theme usage
- **TransitionModal**: Smooth loading transitions

### Usage Example

```tsx
import { useTheme } from "./hooks/useTheme";

function MyComponent() {
  const { theme, applyTheme } = useTheme();

  const changeToBlueTheme = () => {
    applyTheme({
      primaryColor: "#2563eb",
      backgroundColor: "#0f172a",
    });
  };

  return (
    <div style={{ backgroundColor: theme.backgroundColor }}>
      <h1 style={{ color: theme.textColor }}>Hello World</h1>
    </div>
  );
}
```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── ThemeControls.tsx
│   ├── TokenConsumerCard.tsx
│   ├── StatefulConsumerCard.tsx
│   ├── TransitionModal.tsx
│   └── ui/             # Reusable UI components
├── context/            # React Context providers
│   └── ThemeContext.tsx
├── constants/          # Application constants
│   └── themes.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── utils/              # Utility functions
│   └── themeUtils.ts
└── App.tsx            # Main application component
```

## 🎯 Key Technologies

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS v4** - Utility-first CSS framework
- **Vite** - Fast build tool and dev server
- **CSS Custom Properties** - Dynamic CSS variables
- **CSS Grid** - Modern layout system

## 🔧 Customization

### Adding New Themes

1. Define your theme in `src/constants/themes.ts`:

```typescript
export const CUSTOM_THEME: Theme = {
  primaryColor: "#your-color",
  secondaryColor: "#your-color",
  backgroundColor: "#your-color",
  textColor: "#your-color",
};
```

2. Use the theme in your components:

```typescript
const { applyTheme } = useTheme();
applyTheme(CUSTOM_THEME);
```

### Styling

The project uses Tailwind CSS with CSS custom properties. Theme colors are applied through CSS variables:

```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #22c55e;
  --background-color: #0f172a;
  --text-color: #ffffff;
}
```

## 📱 Responsive Design

The application uses CSS Grid for layout and is fully responsive:

- **Mobile**: Single column layout
- **Tablet**: Two-column grid layout
- **Desktop**: Full-width layout with max-width containers

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Powered by [React](https://react.dev/)
