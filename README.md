```🔐 Test Assignment – Authorization Screen
📌 Task

Implement an authorization screen with support for two-factor authentication (2FA) and proper handling of all API error states.

Requirements

Use React + TypeScript

Use React Query for API communication

Use MSW (Mock Service Worker) for API mocking

Handle all error scenarios:

Invalid login

Invalid password

Invalid 2FA code

Server errors

🚀 Functionality
Login Screen

Fields: email, password

Form validation:

Email must contain @

Password must be at least 6 characters long

On successful login → redirect to 2FA screen

Errors are displayed under the form

Two-Factor Authentication (2FA)

Input for 6-digit code

45-second timer before requesting a new code

On successful verification → redirect to Dashboard

Error handling: invalid code, timeout

Dashboard

Shown after successful authentication

Displays a welcome message and a Logout button

📂 Project Structure
src/
 ├─ app/              # Providers (Query, Router, Auth)
 ├─ entities/         # API hooks (React Query)
 ├─ pages/            # Pages (Login, 2FA, Dashboard)
 ├─ shared/           # Utilities and contexts
 ├─ mocks/            # MSW handlers and worker
 └─ index.tsx         # Entry point

🔑 Test Credentials

Use the following credentials for testing:

Email: admin@test.com

Password: 123456

2FA Code: 123456

🛠️ Tech Stack

⚛️ React 18

🔧 TypeScript

📦 React Query

🧩 MSW (Mock Service Worker)

🎨 TailwindCSS

▶️ Getting Started

Install dependencies:

pnpm install


Start the development server:

pnpm dev


Build the project:

pnpm build


Preview the build:

pnpm preview


The app will be available at:
👉 http://localhost:5173

⚠️ Error Scenarios

The mocked API handles the following cases:

❌ Invalid email/password → 401 Unauthorized

❌ Invalid 2FA code → 400 Invalid code

❌ Server error → 500 Internal Server Error

❌ Network error → 503 Service Unavailable

All errors are displayed properly in the UI.

🎥 Demo (Screenshots / GIFs)

Flow: Login → 2FA → Dashboard → Logout

Login	2FA	Dashboard	Logout

	
	
	

Or a single GIF demo:


✅ Result

Fully working prototype with authentication flow

All requests and errors are mocked with MSW

User-friendly UX with timer and resend code feature

Clean code structure with React Query integration
```
