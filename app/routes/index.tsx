import { createFileRoute } from '@tanstack/react-router'

import { SandboxProvider } from '~/sandbox/SandboxContext'

const IndexPage = () => (
  <SandboxProvider>
    <div className="mx-auto max-w-6xl py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Galewings</h1>
        <p className="text-text-muted text-sm">
          VGC damage calculator sandbox.
        </p>
      </header>
      <div className="text-text-faint border-border rounded border border-dashed p-8 text-center text-sm">
        Calculator rows will mount here as later step-10 PRs land.
      </div>
    </div>
  </SandboxProvider>
)

export const Route = createFileRoute('/')({
  component: IndexPage,
})
