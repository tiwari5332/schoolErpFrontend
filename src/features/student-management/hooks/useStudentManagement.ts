import { useState, useEffect } from 'react';
import { Student } from '../constant';
import { StudentApi } from '../api/StudentApi';

export function useStudentManagement() {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [activeTab, setActiveTab] = useState('student-list');
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDetailViewOpen, setIsDetailViewOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [editCandidate, setEditCandidate] = useState<Student | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<Student | null>(null);
  const [isDeletePermanently, setIsDeletePermanently] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const data = await StudentApi.getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'all' || student.grade === selectedGrade;
    return matchesSearch && matchesGrade;
  });

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
      setStudents(students.map(s => s.id === studentData.id ? studentData : s));
    } else {
      setStudents([...students, studentData]);
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
      setStudents(students.filter(s => s.id !== deleteCandidate.id));
      setIsDeleteDialogOpen(false);
      setDeleteCandidate(null);
    }
  };

  return {
    students,
    filteredStudents,
    isLoading,
    searchTerm,
    setSearchTerm,
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
