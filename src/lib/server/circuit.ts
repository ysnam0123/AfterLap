import { CircuitView } from '@/types/circuit';
import { createServerSupabase } from './supabase';

export const fetchCircuits = async (): Promise<CircuitView[]> => {
  const supabase = await createServerSupabase();

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
  const supabase = await createServerSupabase();
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
