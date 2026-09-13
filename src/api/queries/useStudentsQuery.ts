import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { studentService, StudentDTO, StudentFilterParams } from '../services/studentService';

const EMPTY_ARRAY: StudentDTO[] = [];

/**
 * Custom Hook: Fetch list of students with query key factory & filter state
 */
export function useStudentsList(filters: StudentFilterParams = {}) {
  const query = useQuery({
    queryKey: queryKeys.students.list(filters),
    queryFn: () => studentService.getStudents(filters),
  });

  return {
    students: query.data ?? EMPTY_ARRAY,
    isLoading: query.isLoading,
    isFetching: query.isFetching,
    isError: query.isError,
    error: query.error ? (query.error as Error).message : null,
    isEmpty: !query.isLoading && (!query.data || query.data.length === 0),
    refetch: query.refetch,
  };
}

/**
 * Custom Hook: Fetch single student by ID
 */
export function useStudentDetail(id: string) {
  const query = useQuery({
    queryKey: queryKeys.students.detail(id),
    queryFn: () => studentService.getStudentById(id),
    enabled: Boolean(id),
  });

  return {
    student: query.data || null,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error ? (query.error as Error).message : null,
  };
}

/**
 * Custom Hook: Create Student Mutation with Cache Invalidation
 */
export function useCreateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newStudent: Omit<StudentDTO, 'id'>) => studentService.createStudent(newStudent),
    onSuccess: () => {
      // Invalidate student list query cache to trigger background refetch
      queryClient.invalidateQueries({ queryKey: queryKeys.students.lists() });
    },
  });
}

/**
 * Custom Hook: Update Student Mutation with Optimistic Updates
 */
export function useUpdateStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<StudentDTO> }) =>
      studentService.updateStudent(id, updates),
    onMutate: async ({ id, updates }) => {
      // Cancel ongoing queries to avoid overwriting optimistic update
      await queryClient.cancelQueries({ queryKey: queryKeys.students.detail(id) });
      const previousStudent = queryClient.getQueryData<StudentDTO>(queryKeys.students.detail(id));

      // Optimistically update cache
      if (previousStudent) {
        queryClient.setQueryData<StudentDTO>(queryKeys.students.detail(id), {
          ...previousStudent,
          ...updates,
        });
      }

      return { previousStudent };
    },
    onError: (_err, { id }, context) => {
      // Rollback on error
      if (context?.previousStudent) {
        queryClient.setQueryData(queryKeys.students.detail(id), context.previousStudent);
      }
    },
    onSettled: (_data, _err, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.students.lists() });
    },
  });
}

/**
 * Custom Hook: Delete Student Mutation
 */
export function useDeleteStudent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => studentService.deleteStudent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.students.lists() });
    },
  });
}
