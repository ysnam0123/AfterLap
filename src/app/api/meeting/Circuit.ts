import { supabase } from '@/supabase/client';
import { Circuit, CircuitView } from '@/types/circuit';
import { useQuery } from '@tanstack/react-query';

export const fetchCircuitByKey = async (circuitKey: number) => {
  const { data, error } = await supabase
    .from('circuits')
    .select('*')
    .eq('circuit_key', circuitKey)
    .single();

  if (error) {
    console.error('서킷 정보 불러오기 실패:', error);
    return null;
  }

  return data;
};

export function useCircuitData(circuitKey?: number) {
  return useQuery<Circuit | null>({
    queryKey: ['circuit', circuitKey],
    enabled: !!circuitKey,
    queryFn: () => fetchCircuitByKey(circuitKey!),
    staleTime: 1000 * 60 * 60 * 24,
  });
}

export const fetchAllCircuits = async (): Promise<Circuit[]> => {
  const { data, error } = await supabase.from('circuits').select('*');

  if (error) {
    console.error('서킷 정보 불러오기 실패:', error);
    throw error; // 🔥 중요
  }

  return data ?? [];
};

// ==== view ====
export const fetchCircuits = async (): Promise<CircuitView[]> => {
  const { data, error } = await supabase
    .from('v_circuit')
    .select('*')
    .order('first_grand_prix', { ascending: true });

  if (error) {
    console.error('Circuit fetch error:', error);
    throw new Error('Failed to fetch circuits');
  }

  return data as CircuitView[];
};
export const fetchCircuit = async (
  circuitKey: number,
): Promise<CircuitView> => {
  const { data, error } = await supabase
    .from('v_circuit')
    .select('*')
    .eq('circuit_key', circuitKey)
    .order('first_grand_prix', { ascending: true })
    .single();

  if (error) {
    console.error('Circuit fetch error:', error);
    throw new Error('Failed to fetch circuits');
  }

  return data as CircuitView;
};

// ==== view react query ====
export const useCircuitViewData = () => {
  return useQuery<CircuitView[]>({
    queryKey: ['circuits'],
    queryFn: fetchCircuits,
    staleTime: 1000 * 60 * 60 * 24, // 24시간 (서킷은 거의 안 바뀜)
    gcTime: 1000 * 60 * 60 * 24,
  });
};
export const useCircuitDetailData = (circuitKey: number) => {
  return useQuery<CircuitView>({
    queryKey: ['circuit', circuitKey],
    queryFn: () => fetchCircuit(circuitKey),
    staleTime: 1000 * 60 * 60 * 24, // 24시간 (서킷은 거의 안 바뀜)
    gcTime: 1000 * 60 * 60 * 24,
  });
};
