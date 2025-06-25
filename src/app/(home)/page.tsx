import Link from 'next/link';
import './global.css';

export default function HomePage() {
  return (
    
      <main className="flex flex-1 flex-col justify-center text-center">
        <h1 className="mb-4 text-2xl font-bold">Hello CDAS</h1>
        <p className="text-fd-muted-foreground">
          Click Documentation{' '}
          <Link
            href="/docs" legacyBehavior>
            <a className="text-fd-foreground font-semibold underline">
            
          
             docs
            </a>
          </Link>{' '}
          and read about this app.
        </p>
      </main>
      
  );
}


