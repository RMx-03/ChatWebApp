# Vite + React + Tailwind CSS Starter

This is a simple setup guide to create a new Vite project with React and Tailwind CSS.

## 🚀 Getting Started

### 1️⃣ Create a New Project Folder

```sh
mkdir my-react-app && cd my-react-app
```

### 2️⃣ Initialize Vite with React

```sh
npm create vite@latest my-react-app -- --template react
cd my-react-app
```

### 3️⃣ Install Dependencies

```sh
npm install
```

## 🌀 Adding Tailwind CSS

### 4️⃣ Install Tailwind CSS and Vite Plugin

```sh
npm install tailwindcss @tailwindcss/vite
```

### 5️⃣ Configure `vite.config.js`

Open `vite.config.js` and update it with the following:

```js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### 6️⃣ Add Tailwind to `index.css`

Open `src/index.css` and add:

```css
@import "tailwindcss";
```

### 7️⃣ Restart VS Code

Make sure to restart VS Code to apply the changes properly.

### 8️⃣ Start Development Server

```sh
npm run dev
```

## 🎉 Happy Hacking!

