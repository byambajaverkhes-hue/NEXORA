# NEXORA

Mobile-first esports community web app starter.

## Included in this first build
- Responsive dark-red NEXORA interface
- Home, Tournaments, Teams, Community, Leaderboard and Profile pages
- Mobile bottom navigation and mobile menu
- Tournament search/filter UI
- Firebase client initialization scaffold
- Firestore security rules starter

## Run locally
1. Install Node.js on a computer.
2. In this folder run `npm install`.
3. Copy `.env.example` to `.env.local`.
4. Add your Firebase Web App configuration values.
5. Run `npm run dev`.

## Firebase setup
1. Create a Firebase project.
2. Register a Web App and copy its web configuration into `.env.local`.
3. Enable Authentication > Email/Password.
4. Create a Cloud Firestore database.
5. Publish `firestore.rules` in Firestore Rules.
6. Enable Storage only if you need image uploads; set secure Storage Rules before use.

## Important status
This is the first frontend foundation, not a production-ready live service yet.
The sign-in modal is a setup notice, not real authentication. Team creation, invitations,
group chat, image uploads, tournament registration, admin actions, scheduled automation,
and leaderboard calculations still need their backend implementation and testing.

Do not manually assign admin roles from the browser. Owner/admin role assignment must be
performed through a trusted server environment (for example, Firebase Admin SDK in a
Cloud Function), with audit logging. Never expose service-account credentials in frontend code.

Tournament policy in this project: free entry and non-cash community rewards only.
Private in-game IDs must be readable only by the player who submitted them and authorized staff.
Before launch, test every Firestore rule with the Firebase Emulator Suite and review abuse/report handling.
