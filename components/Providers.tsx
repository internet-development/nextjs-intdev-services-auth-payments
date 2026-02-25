'use client';

import * as React from 'react';

import { ModalProvider } from '@root/system/modals/ModalContext';
import { ViewerProvider } from '@root/system/ViewerContext';

export default function Providers({ viewer, sessionKey, children }) {
  return (
    <ViewerProvider viewer={viewer} sessionKey={sessionKey}>
      <ModalProvider>{children}</ModalProvider>
    </ViewerProvider>
  );
}
