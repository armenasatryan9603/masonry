# Photo Gallery App

A responsive photo gallery application built with React, TypeScript, and JSS. Features a masonry grid layout with lazy loading images.

## Features

- Masonry grid layout
- Lazy image loading
- Responsive design
- TypeScript support
- Unit testing with Jest and React Testing Library

## Tech Stack

- React 18
- TypeScript
- React JSS (for styling)
- Jest & React Testing Library (for testing)
- Vite (for build tooling)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone git@github.com:armenasatryan9603/masonry.git

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/         # React components
├── hooks/             # Custom React hooks
├── services/          # API services
├── types/             # TypeScript type definitions
├── utils/             # Utility functions
└── tests/             # Test files
```

## Testing

The project uses Jest and React Testing Library for testing. Tests are located next to the components they test.

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
