# Overview

This is a Restaurant POS Admin Dashboard built with React and Express.js. The application provides super admin functionality for managing restaurants, dish categories, and analytics in a restaurant delivery platform. The frontend features a modern UI with shadcn/ui components, while the backend uses Express.js with a modular storage interface that can switch between in-memory and database storage.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Context API for global app state
- **Data Fetching**: TanStack Query for server state management
- **Forms**: React Hook Form with Zod validation

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Build System**: ESBuild for production bundling
- **Development**: TSX for TypeScript execution
- **Storage Interface**: Modular IStorage interface supporting multiple backends
- **Default Storage**: In-memory storage with Map-based implementation
- **API Design**: RESTful API with /api prefix for all endpoints

## Database Design
- **ORM**: Drizzle ORM with PostgreSQL support
- **Schema**: Shared between client and server
- **Tables**: 
  - `restaurants` - Restaurant information and metrics
  - `categories` - Dish categories with active status
  - `users` - User management (partial implementation)
- **Validation**: Zod schemas for type-safe data validation

## Build and Development
- **Bundler**: Vite for frontend development and building
- **TypeScript**: Strict mode with path mapping for clean imports
- **Development Server**: Vite dev server with HMR and Express middleware
- **Production**: Static file serving from Express server

## Design System
- **Theme**: Light theme with neutral base colors
- **Typography**: Inter font family with system fallbacks
- **Components**: Comprehensive UI component library
- **Layout**: Sidebar navigation with responsive design
- **Icons**: Lucide React icon library

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Neon database driver for serverless PostgreSQL
- **drizzle-orm**: TypeScript ORM for database operations
- **drizzle-kit**: Database migration and schema management tools
- **express**: Web application framework for Node.js
- **react**: Frontend UI library
- **@vitejs/plugin-react**: Vite plugin for React support

## UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for components
- **clsx**: Utility for constructing className strings conditionally

## Data Management
- **@tanstack/react-query**: Data fetching and caching library
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **zod**: TypeScript-first schema validation

## Development Tools
- **typescript**: Static type checking
- **vite**: Frontend build tool and dev server
- **tsx**: TypeScript execution for development
- **esbuild**: Fast JavaScript bundler for production builds

## Additional Libraries
- **wouter**: Minimalist routing library for React
- **date-fns**: Modern JavaScript date utility library
- **recharts**: Composable charting library for React
- **lucide-react**: Beautiful and consistent icon library
- **nanoid**: URL-safe unique string ID generator