import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'

const AuthenticatedLayout = () => <Outlet />

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: ({ context, location }) => {
    const developmentBypass =
      import.meta.env.DEV && import.meta.env.VITE_DEV_BYPASS_AUTH === 'true'
    if (developmentBypass) return

    if (!context.auth.isLoaded) return
    if (!context.auth.isSignedIn) {
      throw redirect({
        to: '/sign-in',
        search: { redirect: location.href },
      })
    }
  },
  component: AuthenticatedLayout,
})
