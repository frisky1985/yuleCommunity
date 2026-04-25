// Module Federation remote types
declare module 'opensource/routes' {
  import { RouteObject } from 'react-router-dom'
  const routes: RouteObject[]
  export default routes
}

declare module 'community/routes' {
  import { RouteObject } from 'react-router-dom'
  const routes: RouteObject[]
  export default routes
}

declare module 'learning/routes' {
  import { RouteObject } from 'react-router-dom'
  const routes: RouteObject[]
  export default routes
}

declare module 'admin/routes' {
  import { RouteObject } from 'react-router-dom'
  const routes: RouteObject[]
  export default routes
}

// Global window extensions for Module Federation
declare global {
  interface Window {
    opensource?: {
      get: (path: string) => Promise<() => any>
    }
    community?: {
      get: (path: string) => Promise<() => any>
    }
    learning?: {
      get: (path: string) => Promise<() => any>
    }
    admin?: {
      get: (path: string) => Promise<() => any>
    }
  }
}

export {}
