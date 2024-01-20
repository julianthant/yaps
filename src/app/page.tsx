import Button from '@/components/ui/Button';
import { db } from '@/lib/db';

export default async function Home() {
  return (
    <div className="text-red-500 h-screen bg-white">
      <Button variant="ghost">Hello</Button>
    </div>
  );
}
