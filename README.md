# 📚 Multi-Level Referral and Earning System Documentation

## 🏆 **Project Overview**

This project is a **Multi-Level Referral and Earning System** built with:

- **Next.js** (App Router) — For the frontend and API routes.
- **PostgreSQL** — For database management.
- **Prisma ORM** — To interact with PostgreSQL.
- **WebSocket (ws)** — For real-time updates.

Users can:

- Refer other users (up to 8 direct referrals).
- Earn profits based on multi-level referrals:
  - **Level 1 (Direct Parent):** 5% of referral's purchase.
  - **Level 2 (Grandparent):** 1% of referral's purchase.

---

## 🗂️ **Project Structure**

```
multi-level-referral/          # Next.js App (Frontend + API)
│
├── prisma/                    # Prisma ORM Configuration
│   ├── schema.prisma          # Database schema
│   └── migrations/            # Prisma migrations
│
├── lib/                       # Shared Libraries
│   └── prisma.ts              # Prisma Client Initialization
│
├── app/                       # Next.js App Router
│   ├── api/                   # API Routes
│   │   ├── users/route.ts     # API for creating users
│   │   ├── referrals/route.ts # API for creating referrals
│   │   └── purchases/route.ts # API for creating purchases
│   ├── page.tsx               # Main Page (Real-Time Updates)
│   └── layout.tsx             # Global Layout
│
├── public/                    # Static Assets
├── styles/                    # Global Styles
│   └── globals.css
│
├── .env                        # Environment Variables
├── package.json
├── tsconfig.json
└── next.config.js

ws-server/                      # WebSocket Server (Real-Time)
│
├── index.ts                    # WebSocket Server Entry
├── package.json
├── tsconfig.json
└── .env                         # Environment Variables
```

---

## ⚙️ **Setup Instructions**

### ✅ **1. Clone the Repository:**

```bash
git clone <repository_url>
cd multi-level-referral
```

### ✅ **2. Install Dependencies:**

```bash
# For Next.js App
npm install

# For WebSocket Server
cd ../ws-server
npm install
```

### ✅ **3. Setup PostgreSQL Database:**

**Using Docker:**

```bash
docker run --name multi_level_referral_db \
  -e POSTGRES_USER=username \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=multi_level_referral \
  -p 5432:5432 \
  -d postgres
```

Update `.env` in both **Next.js** and **WebSocket** projects:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/multi_level_referral"
```

### ✅ **4. Run Prisma Migrations:**

```bash
cd multi-level-referral
npx prisma migrate dev --name init
```

### ✅ **5. Start Services:**

```bash
# Start WebSocket Server
cd ../ws-server
npx tsc
node dist/index.js

# Start Next.js App
cd ../multi-level-referral
npm run dev
```

---

## 🔌 **API Endpoints**

### 📤 **User API:** `/api/users`

- **POST:** Create a new user.

**Request Body:**

```json
{
  "name": "User Name",
  "email": "user@example.com"
}
```

### 📤 **Referrals API:** `/api/referrals`

- **POST:** Create a referral link.

**Request Body:**

```json
{
  "parentUserId": "parent-user-uuid",
  "childUserId": "child-user-uuid"
}
```

### 📤 **Purchases API:** `/api/purchases`

- **POST:** Create a purchase and distribute earnings.

**Request Body:**

```json
{
  "userId": "child-user-uuid",
  "amount": 2000
}
```

---

## 📡 **WebSocket Server**

- **URL:** `ws://localhost:4000`
- Listens for **new purchases** and broadcasts real-time earnings updates.

### **Broadcast Message Example:**

```json
{
  "type": "purchase_made",
  "userId": "user-uuid",
  "amount": 2000
}
```

### **Client Listener Example:**

```javascript
const ws = new WebSocket('ws://localhost:4000');

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log('Real-Time Update:', data);
};
```

---

## 🧪 **Testing the System**

1. **Create Users** (via API or Prisma Studio).
2. **Establish Referrals** between users.
3. **Make Purchases** using the API.
4. **Watch Real-Time Updates** via WebSockets.

Use **Postman** or **cURL** to interact with APIs, and **Prisma Studio** to inspect data:

```bash
npx prisma studio
```

---

## 🛠️ **Troubleshooting**

| Issue                        | Solution                                    |
| ---------------------------- | ------------------------------------------- |
| **Port Already in Use**      | `sudo lsof -i :4000` → `sudo kill -9 <PID>` |
| **WebSocket Not Connecting** | Check CORS settings in WebSocket Server.    |
| **Prisma Errors**            | Run `npx prisma migrate dev` again.         |
| **Database Not Connecting**  | Verify `DATABASE_URL` and restart Docker.   |

---

## 🎉 **Done!**

The **Multi-Level Referral and Earning System** is now fully functional. Users can create referrals, make purchases, and see real-time earnings updates through the WebSocket integration.

Happy coding! 🚀

