# Refactor StudentManagement and Combine Add/Edit Forms

This plan outlines the steps to refactor the `StudentManagement` component into a multi-component architecture, combine the `AddStudentForm` and `EditStudentForm` into a single reusable `StudentForm`, and restructure the code according to the requested folder structure and SOLID principles.

## Proposed Changes

### 1. File Restructuring

We will restructure the `StudentManagement` feature into the following structure:

```text
src/
├── pages/
│   └── StudentManagementPage/
│       └── index.tsx                 <-- New Page Component
├── features/
│   └── student-management/
│       ├── components/
│       │   ├── StudentManagement.tsx <-- Main Container Component
│       │   ├── StudentForm.tsx       <-- Combined Add & Edit Form
│       │   ├── StudentTable.tsx      <-- Extracted Table Component
│       │   ├── StudentStats.tsx      <-- Extracted Stats Cards
│       │   ├── StudentFilters.tsx    <-- Extracted Filters Component
│       │   └── StudentDetailView.tsx <-- Moved from src/components
│       ├── constant/
│       │   └── index.ts              <-- All static data (initialStudents, grades, etc.)
│       ├── hooks/
│       │   └── useStudentManagement.ts <-- Custom hook for state management (optional, to adhere to SOLID)
│       ├── api/
│       │   └── index.ts              <-- API stubs (if needed)
│       └── index.tsx                 <-- Feature Entry Point
└── router/
    └── index.tsx                     <-- Update import path
```

### 2. Combine Add and Edit Forms

Create `src/features/student-management/components/StudentForm.tsx`.
- Accept a `mode` prop (`'add' | 'edit'`) or infer from the presence of a `student` prop.
- If `student` is passed, populate initial state for editing.
- Ensure the single form handles both saving a new student and updating an existing student.
- Delete `src/components/AddStudentForm.tsx` and `src/components/EditStudentForm.tsx`.

### 3. Move Constants

Extract the following from component files into `src/features/student-management/constant/index.ts`:
- `initialStudents`
- `grades`, `bloodGroups`, `genders`, `relations`, `statuses`

### 4. SOLID Refactoring

The current `StudentManagement.tsx` handles state, UI rendering (table, filters, stats, dialogs). We will extract responsibilities:
- `StudentTable.tsx`: Displays the table and handles row actions (edit, delete, view).
- `StudentStats.tsx`: Displays the top KPI cards.
- `StudentFilters.tsx`: Search and grade selection.
- `StudentManagement.tsx`: Acts as the orchestrator component containing the overall state and layout.

### 5. Update Router

Update `src/router/index.tsx` to import the component from the new `pages` folder.

#### [NEW] `src/pages/StudentManagementPage/index.tsx`
#### [NEW] `src/features/student-management/components/StudentForm.tsx`
#### [NEW] `src/features/student-management/components/StudentTable.tsx`
#### [NEW] `src/features/student-management/components/StudentStats.tsx`
#### [NEW] `src/features/student-management/components/StudentFilters.tsx`
#### [NEW] `src/features/student-management/constant/index.ts`
#### [NEW] `src/features/student-management/index.tsx`
#### [MODIFY] `src/router/index.tsx`
#### [MODIFY] `src/features/student-management/components/StudentManagement.tsx`
#### [MODIFY] `src/features/student-management/components/StudentDetailView.tsx`
#### [DELETE] `src/components/StudentManagement.tsx`
#### [DELETE] `src/components/AddStudentForm.tsx`
#### [DELETE] `src/components/EditStudentForm.tsx`
#### [DELETE] `src/features/StudentManagement/index.tsx`

## User Review Required

> [!IMPORTANT]
> - Do you want to keep using the existing mock data (`initialStudents`) or should I set up basic API call structures in the `api/` folder for future integration?
> - Is it acceptable to delete the old `src/features/StudentManagement` directory in favor of the new `src/features/student-management` (kebab-case) to follow standard feature naming conventions?

## Verification Plan

1. **Routing**: Verify `http://localhost:5173/admin-dashboard/students` (or the equivalent route) renders the `StudentManagementPage` properly.
2. **Components**:
   - Clicking "Add Student" opens the combined `StudentForm` in 'add' mode.
   - Clicking "Edit" on a student row opens the combined `StudentForm` in 'edit' mode with pre-filled data.
   - Submitting the form correctly updates the list in both modes.
3. **SOLID**: Verify the main `StudentManagement` component is cleaner and delegates UI rendering to sub-components.
