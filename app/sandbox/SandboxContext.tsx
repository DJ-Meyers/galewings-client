import {
  createContext,
  useContext,
  useReducer,
  type Dispatch,
  type ReactNode,
} from 'react'

import { defaultPlayer } from './defaults'
import { sandboxReducer } from './reducer'
import type { SandboxAction, SandboxState } from './types'

interface SandboxContextValue {
  state: SandboxState
  dispatch: Dispatch<SandboxAction>
}

const SandboxContext = createContext<SandboxContextValue | null>(null)

const initialState: SandboxState = {
  player: defaultPlayer,
  calcs: [],
  expandedCalcId: null,
}

export const SandboxProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(sandboxReducer, initialState)
  return (
    <SandboxContext.Provider value={{ state, dispatch }}>
      {children}
    </SandboxContext.Provider>
  )
}

export const useSandbox = () => {
  const ctx = useContext(SandboxContext)
  if (!ctx)
    throw new Error('useSandbox must be used inside SandboxProvider')
  return ctx
}
