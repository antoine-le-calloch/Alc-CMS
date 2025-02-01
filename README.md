# Developer Guide

This guide provides instructions, standards, and best practices 
to ensure effective collaboration and high-quality code.

## 1. Environment Setup

### Prerequisites

- **Node.js** (version 16 or later)
- **npm** (version 7 or later)

### Installation

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Development

For offline development, you can use firebase as follows:

```bash
firebase emulators:start --project project-id
```

To export data from firestore:

```bash
firebase emulators:export ./dump --project project-id
```

To start emulator with exported data:

```bash
firebase emulators:start --import=./dump --project project-id
```

To start emulator with exported data and save data on shutdown:

```bash
firebase emulators:start --import=./dump --export-on-exit --project project-id
```

## 2. Code standards

### General Guidelines
- Use the Image component from `next/image` for images.
- Use the Link component from `next/link` for links.
- Use container from tailwind-css for each section.

### Naming Conventions
- Use camelCase for variable names.
- Use PascalCase for function names.
- Use kebab-case files and folders in the `app` directory.
- Use PascalCase for component file names.
