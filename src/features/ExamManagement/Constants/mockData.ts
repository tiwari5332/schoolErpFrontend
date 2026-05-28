export interface ClassOption {
  id: string;
  name: string;
}

export interface ExamCategory {
  id: string;
  name: string;
}

export interface SubjectOption {
  id: string;
  name: string;
}

export interface Student {
  id: string;
  rollNo: string;
  name: string;
}

export const classes: ClassOption[] = [
  { id: "class_10a", name: "Class 10 - A" },
  { id: "class_10b", name: "Class 10 - B" },
  { id: "class_9a", name: "Class 9 - A" },
  { id: "class_8b", name: "Class 8 - B" },
];

export const examCategories: ExamCategory[] = [
  { id: "half_yearly", name: "Half-Yearly" },
  { id: "weekly_test", name: "Weekly Test" },
  { id: "final_exam", name: "Final Exam" },
];

export const subjects: SubjectOption[] = [
  { id: "mathematics", name: "Mathematics" },
  { id: "science", name: "Science" },
  { id: "english", name: "English" },
  { id: "physics", name: "Physics" },
  { id: "history", name: "History" },
];

// Helper to look up Max Marks based on subject and exam category
export const getMaxMarks = (subjectId: string, examCategoryId: string): number => {
  if (examCategoryId === "weekly_test") {
    if (subjectId === "english") return 25;
    return 30; // standard weekly test max marks
  }

  // Final/Half-yearly limits
  switch (subjectId) {
    case "english":
      return 50;
    case "history":
      return 80;
    default:
      return 100;
  }
};

export const studentsMap: Record<string, Student[]> = {
  class_10a: [
    { id: "s101", rollNo: "101", name: "Aarav Sharma" },
    { id: "s102", rollNo: "102", name: "Ananya Iyer" },
    { id: "s103", rollNo: "103", name: "Ishaan Verma" },
    { id: "s104", rollNo: "104", name: "Meera Nair" },
    { id: "s105", rollNo: "105", name: "Kabir Mehta" },
  ],
  class_10b: [
    { id: "s106", rollNo: "106", name: "Rohan Gupta" },
    { id: "s107", rollNo: "107", name: "Aditi Rao" },
    { id: "s108", rollNo: "108", name: "Siddharth Sen" },
    { id: "s109", rollNo: "109", name: "Riya Kapoor" },
    { id: "s110", rollNo: "110", name: "Vikram Malhotra" },
  ],
  class_9a: [
    { id: "s201", rollNo: "201", name: "Rahul Dravid" },
    { id: "s202", rollNo: "202", name: "Sourav Ganguly" },
    { id: "s203", rollNo: "203", name: "Sachin Tendulkar" },
    { id: "s204", rollNo: "204", name: "Anil Kumble" },
    { id: "s205", rollNo: "205", name: "VVS Laxman" },
  ],
  class_8b: [
    { id: "s301", rollNo: "301", name: "Virat Kohli" },
    { id: "s302", rollNo: "302", name: "Rohit Sharma" },
    { id: "s303", rollNo: "303", name: "Jasprit Bumrah" },
    { id: "s304", rollNo: "304", name: "KL Rahul" },
    { id: "s305", rollNo: "305", name: "Rishabh Pant" },
  ],
};

export interface TeacherOption {
  id: string;
  name: string;
}

export const teachers: TeacherOption[] = [
  { id: "t1", name: "Ramesh Kumar" },
  { id: "t2", name: "Sunita Sharma" },
  { id: "t3", name: "Alok Gupta" },
  { id: "t4", name: "Neha Verma" },
  { id: "t5", name: "Vikram Singh" },
];
