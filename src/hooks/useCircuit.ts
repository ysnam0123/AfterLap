import { getCircuits, getCircuit } from '@/lib/api/internal/circuit';
import { Circuit, CircuitView } from '@/types/circuit';
import { useQuery } from '@tanstack/react-query';

export function useCircuitData(circuitKey?: number) {
  return useQuery<Circuit | null>({
    queryKey: ['circuit', circuitKey],
    enabled: !!circuitKey,
    queryFn: () => getCircuit(circuitKey!),
    staleTime: 1000 * 60 * 60 * 24,
  });
}
// ==== view react query ====
export const useCircuitViewData = () => {
  return useQuery<CircuitView[]>({
    queryKey: ['circuits'],
    queryFn: getCircuits,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
export const useCircuitDetailData = (circuitKey: number) => {
  return useQuery<Circuit>({
    queryKey: ['circuit', circuitKey],
    queryFn: () => getCircuit(circuitKey),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24,
  });
};
