import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { feeService, FeeRecordDTO } from '../services/feeService';

const EMPTY_ARRAY: FeeRecordDTO[] = [];

export function useFeesList(params: Record<string, any> = {}) {
  const query = useQuery({
    queryKey: queryKeys.fees.lists(),
    queryFn: () => feeService.getFees(params),
  });

  return {
    fees: query.data ?? EMPTY_ARRAY,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? (query.error as Error).message : null,
    refetch: query.refetch,
  };
}

export function useCreateFeeRecord() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (record: Omit<FeeRecordDTO, 'id'>) => feeService.createFeeRecord(record),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.fees.lists() });
    },
  });
}
