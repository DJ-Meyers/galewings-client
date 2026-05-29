import { createFileRoute } from '@tanstack/react-router'

const IndexPage = () => <h1>Galewings</h1>

export const Route = createFileRoute('/')({
  component: IndexPage,
})
