import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redirect to Paper 1 by default
  redirect('/paper/1');
}
