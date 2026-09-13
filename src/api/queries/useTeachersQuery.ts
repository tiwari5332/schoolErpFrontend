import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { teacherService, TeacherDTO, TeacherFilterParams, CreateTeacherPayload } from '../services/teacherService';

const EMPTY_ARRAY: TeacherDTO[] = [];

export function useTeachersList(filters: TeacherFilterParams = {}) {
  const query = useQuery({
    queryKey: queryKeys.teachers.list(filters),
    queryFn: () => teacherService.getTeachers(filters),
  });

  return {
    teachers: query.data ?? EMPTY_ARRAY,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error ? (query.error as Error).message : null,
    isEmpty: !query.isLoading && (!query.data || query.data.length === 0),
    refetch: query.refetch,
  };
}

export function useTeacherDetail(id: string) {
  const query = useQuery({
    queryKey: queryKeys.teachers.detail(id),
    queryFn: () => teacherService.getTeacherById(id),
    enabled: Boolean(id),
  });

  return {
    teacher: query.data || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? (query.error as Error).message : null,
  };
}

export function useCreateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newTeacher: CreateTeacherPayload | Omit<TeacherDTO, 'id'>) =>
      teacherService.createTeacher(newTeacher as any),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teachers.lists() });
    },
  });
}

export function useOnboardTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateTeacherPayload) => teacherService.onboardTeacher(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teachers.lists() });
    },
  });
}

export function useUpdateTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<TeacherDTO> }) =>
      teacherService.updateTeacher(id, updates),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teachers.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.teachers.lists() });
    },
  });
}

export function useDeleteTeacher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => teacherService.deleteTeacher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.teachers.lists() });
    },
  });
}
