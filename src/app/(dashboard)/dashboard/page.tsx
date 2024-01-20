import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { FC } from 'react';
import Button from '@/components/ui/Button';

const page = async ({}) => {
  const session = await getServerSession(authOptions);

  return <p className="text-black">Dashboard</p>;
};

export default page;
