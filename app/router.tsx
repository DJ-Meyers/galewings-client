import type { useAuth } from '@clerk/react'
import { createRouter as createTanStackRouter } from '@tanstack/react-router'

import { routeTree } from '~/routeTree.gen'

export type RouterContext = {
  auth: ReturnType<typeof useAuth>
}

const createRouter = () =>
  createTanStackRouter({
    routeTree,
    defaultPreload: 'intent',
    context: undefined! as RouterContext,
  })

export const getRouter = createRouter

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof createRouter>
  }
}
