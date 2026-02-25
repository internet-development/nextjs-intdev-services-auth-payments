import * as React from 'react';

interface ViewerContextValue {
  viewer: Record<string, any> | null;
  sessionKey: string;
}

const ViewerContext = React.createContext<ViewerContextValue>({ viewer: null, sessionKey: '' });

export function ViewerProvider({ viewer = null, sessionKey = '', children }: { viewer?: Record<string, any> | null; sessionKey?: string; children: React.ReactNode }) {
  const value = React.useMemo(() => ({ viewer, sessionKey }), [viewer, sessionKey]);
  return <ViewerContext.Provider value={value}>{children}</ViewerContext.Provider>;
}

export function useViewer() {
  return React.useContext(ViewerContext);
}
