import { useState, useEffect, useMemo } from 'react';
import { Student } from '../constant';
import {
  useStudentsList,
  useCreateStudent,
  useUpdateStudent,
  useDeleteStudent
} from '../../../api/queries/useStudentsQuery';
import { useUIFilters } from '../../../store';

export function useStudentManagement() {
  const { searchQuery, setSearchQuery, selectedGrade, setSelectedGrade } = useUIFilters();
  const [activeTab, setActiveTab] = useState('student-list');

  const { students, isLoading } = useStudentsList({
    search: searchQuery,
    grade: selectedGrade !== 'all' ? selectedGrade : undefined,
  });

  const createStudentMutation = useCreateStudent();
  const updateStudentMutation = useUpdateStudent();
  const deleteStudentMutation = useDeleteStudent();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editCandidate, setEditCandidate] = useState<Student | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Student | null>(null);
  const [isDeletePermanently, setIsDeletePermanently] = useState(false);

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

  const safeStudents = useMemo(() => {
    return Array.isArray(students) ? (students as Student[]) : [];
  }, [students]);

  const filteredStudents = useMemo(() => {
    return safeStudents.filter(student => {
      if (!student) return false;
      const name = student.name || '';
      const id = student.id || '';
      const email = student.email || '';
      const grade = student.grade || '';

      const query = (searchQuery || '').toLowerCase();
      const matchesSearch = name.toLowerCase().includes(query) ||
        id.toLowerCase().includes(query) ||
        email.toLowerCase().includes(query);
      const matchesGrade = selectedGrade === 'all' || grade === selectedGrade;
      return matchesSearch && matchesGrade;
    });
  }, [safeStudents, searchQuery, selectedGrade]);

  const handleViewStudent = (student: Student) => {
    setSelectedStudent(student);
    setIsDetailViewOpen(true);
  };

  const handleCloseDetailView = () => {
    setIsDetailViewOpen(false);
    setSelectedStudent(null);
  };

  const handleAddClick = () => {
    setEditCandidate(null);
    setIsFormOpen(true);
  };

  const handleEditClick = (student: Student) => {
    setEditCandidate({ ...student });
    setIsFormOpen(true);
  };

  const handleFormSave = (studentData: Student) => {
    if (editCandidate) {
      updateStudentMutation.mutate({ id: studentData.id, updates: studentData as any });
    } else {
      createStudentMutation.mutate(studentData as any);
    }
    setIsFormOpen(false);
    setEditCandidate(null);
  };

  const handleDeleteClick = (student: Student) => {
    setDeleteCandidate(student);
    setIsDeletePermanently(false);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteCandidate) {
      deleteStudentMutation.mutate(deleteCandidate.id);
      setIsDeleteDialogOpen(false);
      setDeleteCandidate(null);
    }
  };

  return {
    students: safeStudents,
    filteredStudents,
    isLoading,
    searchTerm: searchQuery,
    setSearchTerm: setSearchQuery,
    selectedGrade,
    setSelectedGrade,
    activeTab,
    setActiveTab,
    isFormOpen,
    setIsFormOpen,
    isDetailViewOpen,
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    selectedStudent,
    editCandidate,
    deleteCandidate,
    isDeletePermanently,
    setIsDeletePermanently,
    handleViewStudent,
    handleCloseDetailView,
    handleAddClick,
    handleEditClick,
    handleFormSave,
    handleDeleteClick,
    handleDeleteConfirm,
  };
}
