import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '@/components/loader/Loader.style';

const Welcome =  lazy(() => import('../../pages/welcome'));

function Channels() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route key="welcome" path="/" element={<Welcome />} />
        <Route key="*" path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default Channels;
