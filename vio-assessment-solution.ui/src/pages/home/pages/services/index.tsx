import { Suspense, lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Loader from '@/components/loader/Loader.style';
import ServiceForm from './service-form';
import ServiceDetails from './service-details';

const ServiceList =  lazy(() => import('./service-list'));

function Services() {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route key="services" path="*" element={<ServiceList />} />
        <Route key="service-detail" path="/details/:serviceId" element={<ServiceDetails />} />
        <Route key="service-form" path="/form/:serviceId" element={<ServiceForm />} />
        <Route key="*" path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Suspense>
  );
}

export default Services;
