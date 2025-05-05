#  Personal Finance Tracker

A modern web application to track your personal expenses, budgets, and spending insights — built with **Next.js 15**, **React 19**, **MongoDB**, **Recharts**, and **shadcn/ui**.


##  Features

-  Add / delete transactions
-  Category-based expense tracking
-  Monthly bar chart of expenses
-  Category-wise pie chart
-  Summary cards (total, category breakdown, recent)
-  Set monthly budgets
-  Budget vs Actual comparison
-  Smart spending insights
-  Clean UI (custom CSS + shadcn/ui)


##  Tech Stack

- [Next.js 15 (App Router)](https://nextjs.org)
- [React 19](https://react.dev)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Recharts](https://recharts.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- Plain CSS modules for layout


##  Local Setup

```bash
git clone https://github.com/your-username/finance-tracker.git
cd finance-tracker
npm install
```

###  Set up Environment Variables

Create a `.env.local` file in the root:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/yourdbname?retryWrites=true&w=majority
```

### ▶ Run Development Server

```bash
npm run dev
```


##  Deploy

Easily deploy to [Vercel](https://vercel.com/):

- Set `MONGODB_URI` in **Vercel > Project Settings > Environment Variables**
- Click **Deploy**


##  Folder Structure

```
src/
│
├── app/                  # Pages and routing
│   ├── page.tsx          # Main dashboard
│   └── api/              # API routes (MongoDB)
│
├── components/           # UI and feature components
├── constants/            # Predefined category list
├── lib/                  # MongoDB connection
├── models/               # Mongoose schemas
├── styles/               # global.css
├── types/                # TypeScript interfaces
```


##  Upcoming Enhancements : 
CI/CD pipeline integration using github actions is planned and will be added soon.


##  Screenshots

![Screenshot (321)](https://github.com/user-attachments/assets/621924d5-8b7d-433c-8179-c1b88d9ff7cf)

![Screenshot (322)](https://github.com/user-attachments/assets/5db02c4f-2842-481d-a901-bc4d13a2e815)

![Screenshot (323)](https://github.com/user-attachments/assets/de737837-3a2d-454e-97c4-acb65f4cc11a)

![Screenshot (324)](https://github.com/user-attachments/assets/9889fe3b-f30f-4d8b-861b-9b02f383dcd9)

##  Live URL : https://personal-finance-tracker-3bdx.vercel.app/
