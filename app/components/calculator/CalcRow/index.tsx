import { CalcModal } from '~/components/calculator/CalcRow/CalcModal'
import { CalcProvider } from '~/components/calculator/CalcRow/CalcProvider'
import { CalcSummaryRow } from '~/components/calculator/CalcRow/CalcSummaryRow'
import type { CalcRowMode, SandboxCalc } from '~/sandbox/types'

interface Properties {
  calc: SandboxCalc
  mode: CalcRowMode
}

export const CalcRow = ({ calc, mode }: Properties) => (
  <CalcProvider calc={calc} mode={mode}>
    <CalcSummaryRow />
    <CalcModal />
  </CalcProvider>
)
