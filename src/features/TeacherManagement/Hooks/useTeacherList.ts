import { useState, useEffect, useMemo } from 'react';
import { Teacher } from '../Constants';
import {
  useTeachersList,
  useCreateTeacher,
  useUpdateTeacher,
  useDeleteTeacher
} from '../../../api/queries/useTeachersQuery';
import { useUIFilters } from '../../../store';

export function useTeacherList() {
  const { searchQuery, setSearchQuery } = useUIFilters();
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('employee-list');

  const { teachers, isLoading } = useTeachersList({
    search: searchQuery,
    department: selectedDepartment !== 'all' ? selectedDepartment : undefined,
  });

  const createTeacherMutation = useCreateTeacher();
  const updateTeacherMutation = useUpdateTeacher();
  const deleteTeacherMutation = useDeleteTeacher();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [editCandidate, setEditCandidate] = useState<Teacher | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Teacher | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("action") === "add") {
        setIsFormOpen(true);
        const newUrl = window.location.pathname;
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, []);

  const safeTeachers = useMemo(() => {
    return Array.isArray(teachers) ? (teachers as Teacher[]) : [];
  }, [teachers]);

  const filteredTeachers = useMemo(() => {
    return safeTeachers.filter(teacher => {
      if (!teacher) return false;
      const name = teacher.name || '';
      const id = teacher.id || '';
      const email = teacher.email || '';
      const department = teacher.department || '';

      const query = (searchQuery || '').toLowerCase();
      const matchesSearch = name.toLowerCase().includes(query) ||
        id.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query);
      const matchesDepartment = selectedDepartment === 'all' || department === selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }, [safeTeachers, searchQuery, selectedDepartment]);

  const handleViewTeacher = (teacher: Teacher) => {
    setSelectedTeacher(teacher);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedTeacher(null);
  };

  const handleAddClick = () => {
    setEditCandidate(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (teacher: Teacher) => {
    setEditCandidate({ ...teacher });
    setIsFormOpen(true);
  };

  const handleFormSave = (teacherData: Teacher) => {
    if (editCandidate) {
      updateTeacherMutation.mutate({ id: teacherData.id, updates: teacherData as any });
    } else {
      createTeacherMutation.mutate(teacherData as any);
    }
    setIsFormOpen(false);
    setEditCandidate(null);
  };

  const handleDeleteClick = (teacher: Teacher) => {
    setDeleteCandidate(teacher);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteCandidate) {
      deleteTeacherMutation.mutate(deleteCandidate.id);
      setIsDeleteDialogOpen(false);
      setDeleteCandidate(null);
    }
  };

  return {
    teachers: safeTeachers,
    filteredTeachers,
    isLoading,
    searchTerm: searchQuery,
    setSearchTerm: setSearchQuery,
    selectedDepartment,
    setSelectedDepartment,
    activeTab,
    setActiveTab,
    isFormOpen,
    setIsFormOpen,
    isDetailViewOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedTeacher,
    editCandidate,
    deleteCandidate,
    handleViewTeacher,
    handleCloseDetailView,
    handleAddClick,
    handleEditClick,
    handleFormSave,
    handleDeleteClick,
    handleDeleteConfirm,
  };
}
