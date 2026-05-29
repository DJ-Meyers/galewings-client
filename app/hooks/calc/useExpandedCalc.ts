import { useSandbox } from '~/sandbox/SandboxContext'

export const useExpandedCalc = () => {
  const { state, dispatch } = useSandbox()
  return {
    expandedId: state.expandedCalcId,
    setExpandedId: (id: string | null) => dispatch({ type: 'EXPAND', id }),
  }
}
