# SharifiaslDev Full-Stack Website

![sharifiasldev.ir](https://sharifiasldev.ir/images/og-image.png)

This repository contains the **frontend** code for my personal website, [sharifiasldev.ir](https://sharifiasldev.ir). This project is a complete portfolio, blog, and e-commerce website, built from the ground up with a modern **Headless** architecture to replace the previous WordPress version.

The backend for this project is built with **Strapi** and is located in a separate repository.

---

## ✨ Key Features

-   **Headless Architecture:** Complete separation of the frontend from the backend for higher performance and flexibility.
-   **Dynamic Content:** Full management of the portfolio, blog, products, and categories through the Strapi admin panel.
-   **Authentication System:** A complete login, registration, and user dashboard system using **NextAuth.js**.
-   **User Dashboard:**
    -   Edit profile, upload profile and cover images.
    -   View purchased products and access download links.
    -   A full support ticket system for user communication.
-   **E-commerce Store:** Dynamic product pages and nested categories with search and filtering capabilities.
-   **Comprehensive Testing:** Full test coverage with Unit/Integration tests using **Jest** and End-to-End tests using **Cypress** to ensure application stability.

---

## 🛠️ Tech Stack

-   **Frontend:** Next.js 14 (App Router)
-   **Language:** TypeScript
-   **Styling:** Tailwind CSS
-   **Authentication:** NextAuth.js
-   **Animation:** Framer Motion
-   **Testing:** Jest, React Testing Library, Cypress
-   **Backend:** Strapi (in a separate repository)

---

## 🚀 Getting Started (Local Development)

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Burserk84/sharifiasldev.ir.git](https://github.com/Burserk84/sharifiasldev.ir.git)
    cd sharifiasldev.ir
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a file named `.env.local` in the root of the project and add the following values.
    ```env
    # The URL of your Strapi backend
    NEXT_PUBLIC_STRAPI_URL=http://localhost:1337

    # Values for NextAuth.js
    NEXTAUTH_URL=http://localhost:3000
    NEXTAUTH_SECRET=YOUR_GENERATED_SECRET
    ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    You can now view the project at `http://localhost:3000`.

---

## ☁️ Deployment

This project is deployed as a full-stack application on a single **VPS**:
-   **Frontend (This Repository):** Served on the main domain `sharifiasldev.ir`.
-   **Backend (Strapi):** Served on the subdomain `api.sharifiasldev.ir`.

Both applications are managed by Nginx acting as a reverse proxy.
