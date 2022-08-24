import dynamic from 'next/dynamic';

const Admin = () => {
  const DynamicComponentWithNoSSR = dynamic(() => import('./CMSView'), {
    ssr: false
  });

  return <DynamicComponentWithNoSSR />;
};

export default Admin;
