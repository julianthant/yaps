import { fetchRedis } from '@/helpers/redis';
import FriendRequests from '@/components/FriendRequests';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { FC } from 'react';

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  //ids of people who sent us a friend requests
  const incomingSenderIds = (await fetchRedis(
    'smembers',
    `user:${session.user.id}:incoming_friend_requests`
  )) as string[];

  const incomingFriendRequests = await Promise.all(
    incomingSenderIds.map(async (id) => {
      const sender = (await fetchRedis('get', `user:${id}`)) as string;
      const senderParsed = JSON.parse(sender) as User;
      return {
        id,
        senderEmail: senderParsed.email,
        senderName: senderParsed.name,
      };
    })
  );

  return (
    <main className="pt-8 h-screen bg-white">
      <h1 className="font-bold text-5xl mb-8 text-black">Friend requests</h1>
      <div className="flex flex-col gap-4">
        <FriendRequests
          incomingFriendRequests={incomingFriendRequests}
          sessionId={session.user.id}
        />
      </div>
    </main>
  );
};

export default page;
