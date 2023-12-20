import Loader from '@/components/loader/Loader.style';
import { ILayoutState } from '@/store/reducers/layout';
import { selectLayoutState } from '@/store/reducers/layout/layout-selectors';
import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

const Welcome =  React.lazy(() => import('../pages/welcome'));
const Channels =  React.lazy(() => import('../pages/channels'));
const FindUsers =  React.lazy(() => import('../pages/find-users'));

const Container = styled.div<ILayoutState>`
  position: relative;
  width: 100%;
  max-width: calc(100vw - ${({ isSm, sidebarState: { collapsed } }) => isSm ? '0' : collapsed ? '80px' : '220px'});
  height: 100%;
  overflow: auto;
`;

function Content(): JSX.Element {
  const layoutState = useSelector(selectLayoutState());

  return (
    <Container id="content" {...layoutState}>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route key="welcome" path="/" element={<Welcome />} />
          <Route key="find-users" path="find-users" element={<FindUsers />} />
          <Route key="channels" path="channels/*" element={<Channels />} />
          <Route key="*" path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Suspense>
    </Container>
  );
}

export default Content;
