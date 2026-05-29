import { useCalcRowContext } from '~/context/CalcRowContext'
import { useSandboxStore } from '~/sandbox/store'

export const useFieldConditions = () => {
  const { calcId } = useCalcRowContext()
  const fc = useSandboxStore((s) => s.calcs[calcId].fieldConditions)
  const setWeather = useSandboxStore((s) => s.setWeather)
  const setTerrain = useSandboxStore((s) => s.setTerrain)
  const toggleRuin = useSandboxStore((s) => s.toggleRuin)
  const toggleAttackerSide = useSandboxStore((s) => s.toggleAttackerSide)
  const toggleDefenderSide = useSandboxStore((s) => s.toggleDefenderSide)

  return {
    weather: fc.weather,
    terrain: fc.terrain,
    isBeadsOfRuin: !!fc.isBeadsOfRuin,
    isSwordOfRuin: !!fc.isSwordOfRuin,
    isTabletsOfRuin: !!fc.isTabletsOfRuin,
    isVesselOfRuin: !!fc.isVesselOfRuin,
    attackerSide: fc.attackerSide ?? {},
    defenderSide: fc.defenderSide ?? {},
    setWeather: (weather: Parameters<typeof setWeather>[1]) =>
      setWeather(calcId, weather),
    setTerrain: (terrain: Parameters<typeof setTerrain>[1]) =>
      setTerrain(calcId, terrain),
    toggleRuin: (key: Parameters<typeof toggleRuin>[1]) =>
      toggleRuin(calcId, key),
    toggleAttackerSide: (key: Parameters<typeof toggleAttackerSide>[1]) =>
      toggleAttackerSide(calcId, key),
    toggleDefenderSide: (key: Parameters<typeof toggleDefenderSide>[1]) =>
      toggleDefenderSide(calcId, key),
  }
}
