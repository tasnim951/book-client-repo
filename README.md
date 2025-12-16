# BookCourier – Library-to-Home Delivery System

## Project Overview
BookCourier is a library-to-home book delivery system that allows users to browse, order, and receive books without visiting the library. Librarians can manage books and orders, and admins can manage users and books.

## Live URL
[(https://dazzling-frangollo-06a1cd.netlify.app/)]

## Key Features
- **Browse & Order Books:** View book details, place orders via a modal form (pre-filled name/email), order status: `pending`, payment status: `unpaid`.
- **Wishlist & Reviews:** Add books to wishlist; leave ratings and reviews after ordering.
- **Payment Integration:** Pay for orders securely; payment status updates automatically.
- **User Dashboard:** My Orders, Invoices, Profile update.
- **Librarian Dashboard:** Add/Edit books, Manage orders, Update order status.
- **Admin Dashboard:** Manage all users and books.
- **UI/UX:** Responsive design, clean layout, consistent buttons, modern navbar/footer, optional dark/light mode.

## Tech Stack & NPM Packages
- **Frontend:** React, React Router, Tailwind CSS, React Icons, SweetAlert2  
- **Backend:** Node.js, Express, MongoDB  
- **Authentication:** Firebase (email/password + social login)  
- **Optional:** TanStack Query for data fetching, Skeleton loaders for better UX  

## Setup
1. Clone the repo:  
```bash
git clone https://github.com/yourusername/bookcourier.git 
 ```

##
2. Install dependencies:
```bash
npm install
```
## 
  3. Start client:
```bash
 npm start
```

## 
4. Start server:
```bash
cd server
npm install
npm run dev
```