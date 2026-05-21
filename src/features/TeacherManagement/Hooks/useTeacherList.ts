import { useState, useEffect } from 'react';
import { Teacher } from '../Constants';
import { TeacherApi } from '../api/TeacherApi';

export function useTeacherList() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState('employee-list');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  const [editCandidate, setEditCandidate] = useState<Teacher | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Teacher | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        setIsLoading(true);
        const data = await TeacherApi.getTeachers();
        setTeachers(data);
      } catch (error) {
        console.error("Failed to fetch teachers", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTeachers();
  }, []);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || teacher.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

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
      setTeachers(teachers.map(t => t.id === teacherData.id ? teacherData : t));
    } else {
      setTeachers([...teachers, teacherData]);
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
      setTeachers(teachers.filter(t => t.id !== deleteCandidate.id));
      setIsDeleteDialogOpen(false);
      setDeleteCandidate(null);
    }
  };

  return {
    teachers,
    filteredTeachers,
    isLoading,
    searchTerm,
    setSearchTerm,
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
