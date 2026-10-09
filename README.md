# Yaps

A real-time one-to-one chat app. Users sign in with Google, add friends by email and chat with messages that arrive instantly through Pusher. Built with Next.js 14, NextAuth and Upstash Redis in January 2024.

## Status

Complete for its scope. Every feature below works end to end.

## What it does

- Signs users in with Google through NextAuth. Middleware keeps `/dashboard` behind sign-in.
- Sends a friend request to any registered email address. The other user accepts or denies it from the requests page.
- Updates the friend-request count and the chat list live, without a page reload.
- Delivers chat messages in real time and shows a toast for a new message in a chat you don't have open.
- Checks on the server that the sender belongs to the chat and is friends with the recipient before it stores a message.
- Has a separate chat layout for phones.

## How it works

Upstash Redis is the only datastore. Keys follow one pattern per record:

| Key | Holds |
| --- | --- |
| `user:{id}` | The user's profile |
| `user:email:{email}` | The user ID for an email, used to add friends |
| `user:{id}:incoming_friend_requests` | A set of pending request IDs |
| `user:{id}:friends` | A set of friend IDs |
| `chat:{idA--idB}:messages` | A sorted set of messages, scored by timestamp |

When a message is sent, `POST /api/message/send` validates it with Zod, stores it in the chat's sorted set and triggers two Pusher events. One goes to the open chat and one to the recipient's chat list.

## Tech stack

- Next.js 14 (App Router) and TypeScript
- NextAuth with the Upstash Redis adapter
- Upstash Redis
- Pusher Channels
- Tailwind CSS, React Hook Form, Zod and react-hot-toast

## Run it locally

You need Node.js 18 or later, an Upstash Redis database, a Pusher Channels app and a Google OAuth client.

1. Install the dependencies:

   ```bash
   npm install
   ```

2. Create `.env.local`:

   ```bash
   NEXTAUTH_SECRET=             # any long random string
   GOOGLE_CLIENT_ID=
   GOOGLE_CLIENT_SECRET=
   UPSTASH_REDIS_REST_URL=
   UPSTASH_REDIS_REST_TOKEN=
   PUSHER_APP_ID=
   PUSHER_SECRET=
   NEXT_PUBLIC_PUSHER_KEY=
   NEXT_PUBLIC_PUSHER_CLUSTER=
   ```

3. Start the dev server and open http://localhost:3000:

   ```bash
   npm run dev
   ```
