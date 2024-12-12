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

For offline development you can use firebase as follows:

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

## 2. Code standards

### General Guidelines
- Use Image component from `next/image` for images.
- Use Link component from `next/link` for links.
- Use container from tailwindcss for each section.

### Naming Conventions
