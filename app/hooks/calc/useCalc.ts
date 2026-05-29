import { useContext } from 'react'

import { CalcContext } from '~/context/CalcContext'

export const useCalc = () => {
  const ctx = useContext(CalcContext)
  if (!ctx) throw new Error('useCalc must be used inside a CalcContextProvider')
  return ctx
}
