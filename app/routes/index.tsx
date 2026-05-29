import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'

import { CalcRow } from '~/components/calculator/CalcRow'
import { SpeedCalcRow } from '~/components/SpeedCalcRow'
import { makeCalc } from '~/sandbox/defaults'
import { SandboxProvider, useSandbox } from '~/sandbox/SandboxContext'

const SandboxSmokeTest = () => {
  const { state, dispatch } = useSandbox()

  useEffect(() => {
    if (state.calcs.length === 0) {
      dispatch({ type: 'CALC_ADD', calc: makeCalc('offensive') })
      dispatch({ type: 'CALC_ADD', calc: makeCalc('speed') })
    }
  }, [state.calcs.length, dispatch])

  return (
    <div className="mx-auto max-w-6xl py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Galewings</h1>
        <p className="text-text-muted text-sm">
          VGC damage calculator sandbox.
        </p>
      </header>
      {state.calcs.map((calc) => {
        if (calc.type === 'speed')
          return <SpeedCalcRow key={calc.id} calc={calc} />
        return <CalcRow key={calc.id} calc={calc} mode={calc.type} />
      })}
    </div>
  )
}

const IndexPage = () => (
  <SandboxProvider>
    <SandboxSmokeTest />
  </SandboxProvider>
)

export const Route = createFileRoute('/')({
  component: IndexPage,
})
