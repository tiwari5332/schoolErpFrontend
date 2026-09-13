import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '../queryKeys';
import { academicService } from '../services/academicService';
import { Department } from '../../features/academic-setup/Constants';

const EMPTY_ARRAY: any[] = [];

export function useDepartmentsQuery() {
  const query = useQuery({
    queryKey: queryKeys.academic.departments(),
    queryFn: () => academicService.getDepartments(),
  });

  return {
    departments: query.data ?? EMPTY_ARRAY,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export function useClassesQuery() {
  const query = useQuery({
    queryKey: queryKeys.academic.classes(),
    queryFn: () => academicService.getClasses(),
  });

  return {
    classes: query.data ?? EMPTY_ARRAY,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export function useSubjectsQuery() {
  const query = useQuery({
    queryKey: queryKeys.academic.subjects(),
    queryFn: () => academicService.getSubjects(),
  });

  return {
    subjects: query.data ?? EMPTY_ARRAY,
    isLoading: query.isLoading,
    isError: query.isError,
    refetch: query.refetch,
  };
}

export function useSaveDepartmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dept: Partial<Department>) => academicService.saveDepartment(dept),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.departments() });
    },
  });
}

export function useDeleteDepartmentMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => academicService.deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.departments() });
    },
  });
}

export function useSaveClassMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cls: Parameters<typeof academicService.saveClass>[0]) => academicService.saveClass(cls),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.classes() });
    },
  });
}

export function useDeleteClassMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => academicService.deleteClass(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.classes() });
    },
  });
}

export function useCreateSectionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Parameters<typeof academicService.createSection>[0]) => academicService.createSection(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.classes() });
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.sections() });
    },
  });
}

export function useUpdateSectionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sectionId, payload }: { sectionId: string; payload: Parameters<typeof academicService.updateSection>[1] }) =>
      academicService.updateSection(sectionId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.classes() });
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.sections() });
    },
  });
}

export function useDeleteSectionMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sectionId: string) => academicService.deleteSection(sectionId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.classes() });
      queryClient.invalidateQueries({ queryKey: queryKeys.academic.sections() });
    },
  });
}
