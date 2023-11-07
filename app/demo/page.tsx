import React from 'react';
import { FileView } from '@/components/file-view'
import Link from 'next/link';

const HomePage: React.FC = () => {
  return (
    <div>
      <Link href="/">Welcome to the Demo Page</Link>
      <FileView />
    </div>
  );
}

export default HomePage;