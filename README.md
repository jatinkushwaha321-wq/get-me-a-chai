# Get Me A Chai! ☕

Get Me A Chai is a premium, modern crowdfunding platform built for creators to receive support and donations directly from their fans. Inspired by platforms like Buy Me a Coffee and Patreon, it allows creators to set up customized public pages, collect micro-payments, and display contributions dynamically.

---

## 🚀 Key Features

*   **🔒 OAuth Social Authentication**: Fast and secure login via **GitHub** and **Google** OAuth providers powered by NextAuth.
*   **👤 Dynamic Profile Pages (`/[username]`)**: Creators get personalized public pages with their cover photos, profile avatars, supporter counts, and total earnings.
*   **💳 Integrated Payments**: Seamless micro-donations via **Razorpay** supporting custom amounts and predefined payment shortcuts (₹10, ₹20, ₹30).
*   **🛠️ Interactive Creator Dashboard**: A private dashboard for creators to manage their settings, upload custom cover/profile pictures, and enter their own Razorpay API credentials.
*   **🔔 Dynamic Alerts**: Real-time toast notifications (react-toastify) for successful payments and profile updates.
*   **🔍 Automatic Route Handling**: Secure server-side validation that serves a **404 Not Found page** programmatically if a username doesn't exist in the database.
*   **🛡️ Secure Webhooks**: Server-side cryptographic signature validation on Razorpay payment callbacks to prevent fraudulent transaction reports.

---

## 🛠️ Tech Stack

*   **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
*   **Database**: [MongoDB Atlas](https://www.mongodb.com/) via [Mongoose](https://mongoosejs.com/)
*   **Authentication**: [NextAuth.js](https://next-auth.js.org/)
*   **Payment Gateway**: [Razorpay SDK](https://razorpay.com/)
*   **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
*   **Notifications**: [React-Toastify](https://github.com/fkhadra/react-toastify)

---

## 📁 Project Structure

```text
├── actions/             # Next.js Server Actions (useractions.js)
├── app/                 # Next.js App Router Routes & API Endpoints
│   ├── [username]/      # Dynamic profile page route
│   ├── about/           # Info page detailing project vision
│   ├── api/             # API Endpoints (auth callbacks, Razorpay webhooks)
│   ├── dashboard/       # Creator profile configuration dashboard
│   ├── login/           # OAuth entry sign-in page
│   ├── globals.css      # Core styles & Tailwind directives
│   └── layout.js        # Main layout wrapper with session wrapper
├── components/          # Reusable React client components (Navbar, Paymentpage, etc.)
├── db/                  # MongoDB connection helpers (connectDb.js)
├── models/              # Mongoose DB Models (User.js, Payment.js)
├── public/              # Static files (GIFs, avatars, icons)
├── .env.local           # Local configuration environment secrets
└── package.json         # Build commands and dependency listings
```

---

## ⚙️ Environment Configuration

Create a `.env.local` file in the root directory and add the following keys:

```ini
# NextAuth Authentication Config
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_jwt_secret

# GitHub OAuth App Secrets
GITHUB_ID=your_github_client_id
GITHUB_SECRET=your_github_client_secret

# Google OAuth App Secrets
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Razorpay API Credentials
KEY_ID=your_razorpay_api_key_id
NEXT_PUBLIC_KEY_ID=your_razorpay_api_key_id
KEY_SECRET=your_razorpay_api_key_secret

# Public Website URL
URL=http://localhost:3000
NEXT_PUBLIC_URL=http://localhost:3000

# MongoDB Atlas Database URI (Standard/Direct format recommended)
MONGODB_URI=mongodb://username:password@shard1:27017,shard2:27017/chai?ssl=true&replicaSet=atlas-shard-0&authSource=admin
```

---

## 🏃 Local Setup & Development

### 1. Clone the repository
```bash
git clone <repository-url>
cd get-me-a-chai
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
npm run start
```

---

## 🧪 Linting & Formatting
To keep the codebase clean, check for ESLint warnings and errors:
```bash
npm run lint
```
