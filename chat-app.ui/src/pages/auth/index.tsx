import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '@/components/loader/Loader.style';

const SignIn = lazy(() => import('./sign-in'));
const SignUp = lazy(() => import('./sign-up'));

export default function Auth(): JSX.Element {
  return (
    <div className="w-screen h-screen overflow-hidden bg-primary text-primary-foreground flex justify-center items-center m-0 p-0">
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route key="signin" path="signin" element={<SignIn />} />
          <Route key="signup" path="signup" element={<SignUp />} />
          <Route key="*" path="*" element={<Navigate to="/auth/signin" />} />
        </Routes>
      </Suspense>
    </div>
  );
}
