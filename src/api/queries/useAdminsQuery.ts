import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { adminService, AdminDTO, AdminFilterParams } from '../services/adminService';

const EMPTY_ARRAY: AdminDTO[] = [];

export function useAdminsList(filters: AdminFilterParams = {}) {
  const query = useQuery({
    queryKey: queryKeys.auth.all,
    queryFn: () => adminService.getAdmins(filters),
  });

  return {
    admins: query.data ?? EMPTY_ARRAY,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error ? (query.error as Error).message : null,
    isEmpty: !query.isLoading && (!query.data || query.data.length === 0),
    refetch: query.refetch,
  };
}

export function useCreateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newAdmin: Omit<AdminDTO, 'id'>) => adminService.createAdmin(newAdmin),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
}

export function useUpdateAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<AdminDTO> }) =>
      adminService.updateAdmin(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
}

export function useDeleteAdmin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminService.deleteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.all });
    },
  });
}
