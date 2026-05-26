# Full-Stack Blog Platform

Hey there! Welcome to the repository for my premium full-stack blog application. I built this project to provide a fast, secure, and clean platform where readers can browse articles, authors can write and manage their content, and administrators can oversee the platform.

---

## ✨ Features at a Glance

- **Role-Based Access Control (RBAC):** Three dedicated user roles:
  - **User:** Can register, browse active articles, read comments, and manage their personal profile.
  - **Author:** Can write, edit, categorize, and soft-delete their own articles. Features a dedicated Author Dashboard.
  - **Admin:** Has full oversight capabilities.
- **Secure Authentication:** Powered by JSON Web Tokens (JWT) stored securely in HTTP-only cookies, combined with robust password hashing via `bcrypt`.
- **Media Uploads:** Native profile image integration leveraging `multer` (memory storage) and streaming uploads straight to **Cloudinary**.
- **Responsive & Premium Aesthetics:** Built using modern React tools, custom CSS utilities, and absolute bottom sticky footers to ensure the layout always looks perfectly clean, even on empty state screens.

---

## 🌐 Deployment

- **Frontend:** Deployed on **Vercel**
- **Backend:** Deployed on **Render**


---

## 🛠️ Tech Stack

### Frontend
- **Framework:** React + Vite
- **Routing:** React Router v7
- **Form Handling:** React Hook Form
- **Network Requests:** Axios (with cross-origin credentials enabled)
- **Styling:** Custom Vanilla/Tailwind flex utilities with an Apple-inspired minimalist aesthetic

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas (connected via Mongoose ODM)
- **Storage:** Cloudinary API

---

## 🚀 Getting Started Locally

Follow these steps to get the project up and running on your local machine.

### 1. Setup the Environment Variables

In your `Backend` directory, create a `.env` file with the following keys:

```env
DB_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/?appName=Cluster0
PORT=4000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 2. Start the Backend Server

Open a terminal, navigate to the backend directory, install the dependencies, and start the development server:

```bash
cd Backend
npm install
npm run dev # or run with nodemon server.js
```
*(The server will spin up on `http://localhost:4000`)*

### 3. Start the Frontend Application

Open another terminal tab, navigate to the frontend folder, install packages, and boot up the Vite server:

```bash
cd Frontend
npm install
npm run dev
```
*(Visit `http://localhost:5173` in your browser to explore the platform)*

---

## 💡 Architecture & Design Notes

- **Pre-flight Form Validation:** Registration screens enforce strong validations (required field checking, role enforcement, and file format validation) before making external API requests, keeping error feedback snappy.
- **Sticky Footer Wrapper:** By architecting the main `RootLayout` with a `flex flex-col min-h-screen` container and allowing the inner main view to `flex-grow`, the footer is forcefully kept pinned to the bottom of the screen.

Feel free to fork, explore the code, and submit pull requests if you have ideas for enhancements!
