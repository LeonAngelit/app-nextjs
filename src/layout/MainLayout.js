import Header from '@components/Header';
import Nav from '@common/Nav';
import jsCookie from 'js-cookie';
import Router from 'next/router';
import { useEffect } from 'react';

export default function MainLayout({ children }) {
  useEffect(() => {
    if (!jsCookie.get('token')) {
      Router.push('/login');
    }
  }, []);
  return (
    <>
      <div className="min-h-full">
        <Header />
        <Nav />
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">{children}</div>
        </main>
      </div>
    </>
  );
}
