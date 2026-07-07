# 🚀 DevChronicles — Frontend (React + Vite + Apollo Client)

A modern, high-performance Full-Stack Blog Application frontend built with **React (Vite)**, **Apollo Client**, and a custom **Glassmorphism CSS Design System**. 

This repository serves as the frontend user interface for the **GraphQL Blog App assignment**, featuring real-time debounced searching, tag filtering, drag-and-drop Base64 image uploading, and custom confirmation modals.

---

## ✨ Features & Highlights

- **⚡ Blazing Fast Vite + React**: Optimized bundling with near-instant Hot Module Replacement (HMR).
- **📡 Declarative GraphQL (Apollo Client)**: Normalized memory caching, intelligent optimistic UI updates, and zero-spam 350ms debounced queries using `fetchPolicy: 'cache-first'`.
- **🎨 Premium Design Aesthetics**: 
  - Custom glassmorphism cards (`backdrop-filter: blur(16px)`).
  - Ambient radial gradients and smooth hover micro-animations.
  - Native **Dark / Light theme switching** with persistent DOM data-attributes.
- **🖼️ Interactive Drag-and-Drop Image Uploader**: Converts uploaded local images (PNG/JPG/WEBP up to 5MB) into Base64 data strings seamlessly without external cloud bucket dependencies.
- **🗑️ Custom Confirmation Modal**: Sleek, animated popup for article deletions (`DeleteConfirmModal`) replacing default browser system alerts.

---

## 🛠️ Technology Stack

- **Core Framework**: React 18 (via Vite 5)
- **State & API**: Apollo Client 3 (`@apollo/client`, `graphql`)
- **Icons**: Lucide React (`lucide-react`)
- **Styling**: Vanilla CSS (CSS Variables, Flexbox/Grid, Responsive Media Queries)

---

## 🚀 Getting Started Locally

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **Backend API**: Ensure the [GraphQL Backend Server](https://github.com/rishi1606/GraphQL-Blog-Backend) is running on `http://localhost:5000/graphql`.

### 2. Installation
Clone the repository and install dependencies:

```bash
git clone https://github.com/rishi1606/GraphQL-Blog-Frontend.git
cd GraphQL-Blog-Frontend
npm install
