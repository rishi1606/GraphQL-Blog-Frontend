# 🚀 DevChronicles — Frontend (React + Vite + Apollo Client)

A modern, high-performance Full-Stack Blog Application frontend built with **React (Vite)**, **Apollo Client**, and a custom **Glassmorphism CSS Design System**. 

This repository serves as the frontend user interface for the **GraphQL Blog App assignment**, featuring real-time debounced searching, tag filtering, drag-and-drop Base64 image uploading, and custom confirmation modals.

---

## 🧠 Architectural Approach & Design Philosophy

When designing and engineering this frontend, our goal was to build an application that feels premium, highly responsive, and architecturally resilient without relying on bulky external UI libraries.

### 1. Declarative Data Fetching & State Management
Instead of manually managing `fetch` requests and complex loading/error states in Redux or `useEffect`, we adopted **Apollo Client 3**. 
- By leveraging Apollo's normalized in-memory cache, queries (`useQuery`) and mutations (`useMutation`) automatically update the UI declaratively.
- **Performance Optimization**: To prevent network spam while typing in the search bar, we implemented a custom **350ms debounce hook** coupled with Apollo's `fetchPolicy: 'cache-first'`. Once blog posts or search results are fetched once, subsequent filter toggles and searches load instantly from memory with **0 network requests**.

### 2. Zero-Dependency Base64 Image Uploading
To make the application 100% portable and easy for evaluators to test out of the box, we eliminated external cloud storage dependencies (like AWS S3 or Cloudinary). 
- When a user drags and drops a cover image into the modal, the frontend uses the browser's native `FileReader` API to convert the image file into a **Base64 Data URI string**.
- This encoded string is sent directly as a GraphQL variable and rendered seamlessly via standard `<img src={...} />` tags.

### 3. Premium Glassmorphic Design System
We eschewed generic CSS frameworks in favor of a bespoke Vanilla CSS design system (`index.css`):
- **Visual Depth**: Utilizes `backdrop-filter: blur(16px)` combined with subtle radial ambient glows and floating hover micro-animations.
- **Theme Resilience**: Implements native **Dark / Light mode switching** by dynamically toggling a data-attribute (`data-theme`) on the document root, ensuring all colors transition smoothly via CSS custom properties.
- **Tactile Feedback**: Browser system alerts (`window.confirm`) were replaced with a custom-built, animated glassmorphic modal (`DeleteConfirmModal`) featuring event propagation protection.

---

## ✨ Features & Highlights

- **⚡ Blazing Fast Vite + React**: Optimized bundling with near-instant Hot Module Replacement (HMR).
- **📡 Declarative GraphQL (Apollo Client)**: Normalized memory caching, intelligent optimistic UI updates, and zero-spam debounced queries.
- **🎨 Premium Design Aesthetics**: 
  - Custom glassmorphism cards and smooth hover animations.
  - Native **Dark / Light theme switching**.
- **🖼️ Interactive Drag-and-Drop Image Uploader**: Supports local image file selection and drag-and-drop (PNG/JPG/WEBP up to 5MB) with live thumbnail previews.
- **🗑️ Custom Confirmation Modal**: Sleek, animated popup for article deletions replacing default browser alerts.
- **📱 Responsive Architecture**: Fluid layout adapting cleanly across desktop monitors, tablets, and smartphones.

---

## 🛠️ Technology Stack

- **Core Framework**: React 18 (via Vite 5)
- **State & API**: Apollo Client 3 (`@apollo/client`, `graphql`)
- **Icons**: Lucide React (`lucide-react`)
- **Styling**: Bespoke Vanilla CSS (CSS Variables, Flexbox/CSS Grid, Responsive Media Queries)

---

## ⚙️ Step-by-Step Setup Instructions

Follow these instructions to run the frontend application on your local machine.

### Prerequisites
1. **Node.js**: Ensure Node.js (`v18.x` or higher) is installed on your machine. You can verify by running `node -v` in your terminal.
2. **Backend API**: Ensure the [GraphQL Backend Server](https://github.com/rishi1606/GraphQL-Blog-Backend) is running locally on port `5000` (serving GraphQL at `http://localhost:5000/graphql`).

### Step 1: Clone the Repository
Open your terminal and clone this frontend repository:
```bash
git clone https://github.com/rishi1606/GraphQL-Blog-Frontend.git
cd GraphQL-Blog-Frontend
