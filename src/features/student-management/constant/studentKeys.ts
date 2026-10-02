/**
 * Single Source of Truth for Student Data Keys & Payload Mapping
 * Any change to a key in STUDENT_FIELD_KEYS automatically updates form submission payloads,
 * table columns, and data getters across the application.
 */

export const STUDENT_FIELD_KEYS = {
  ID: 'id',
  NAME: 'name',
  EMAIL: 'email',
  GRADE: 'grade',
  CLASS: 'class',
  SECTION: 'section',
  BATCH_CODE: 'batchCode',
  ROLL_NO: 'rollNo',
  FATHER_NAME: 'fatherName',
  PHONE: 'phone',
  ADDRESS: 'address',
  STATUS: 'status',
  ADMISSION_DATE: 'admissionDate',
  GUARDIAN: 'guardian',
  AVATAR: 'avatar',
  FEE_STATUS: 'feeStatus',
  IS_PROMOTED: 'isPromoted',
  IS_BLOCKED: 'isBlocked',
} as const;

export type StudentFieldKey = (typeof STUDENT_FIELD_KEYS)[keyof typeof STUDENT_FIELD_KEYS];

/**
 * Standardized Payload Builder for Student Form Submissions
 * Maps input data onto centralized key schema
 */
export function buildStudentPayload(formData: Record<string, any>): Record<string, any> {
  return {
    [STUDENT_FIELD_KEYS.ID]: formData[STUDENT_FIELD_KEYS.ID] || '',
    [STUDENT_FIELD_KEYS.NAME]: formData[STUDENT_FIELD_KEYS.NAME] || '',
    [STUDENT_FIELD_KEYS.EMAIL]: formData[STUDENT_FIELD_KEYS.EMAIL] || '',
    [STUDENT_FIELD_KEYS.GRADE]: formData[STUDENT_FIELD_KEYS.GRADE] || '',
    [STUDENT_FIELD_KEYS.CLASS]: formData[STUDENT_FIELD_KEYS.CLASS] || '',
    [STUDENT_FIELD_KEYS.SECTION]: formData[STUDENT_FIELD_KEYS.SECTION] || '',
    [STUDENT_FIELD_KEYS.BATCH_CODE]: formData[STUDENT_FIELD_KEYS.BATCH_CODE] || '',
    [STUDENT_FIELD_KEYS.ROLL_NO]: formData[STUDENT_FIELD_KEYS.ROLL_NO] || '',
    [STUDENT_FIELD_KEYS.FATHER_NAME]: formData[STUDENT_FIELD_KEYS.FATHER_NAME] || '',
    [STUDENT_FIELD_KEYS.PHONE]: formData[STUDENT_FIELD_KEYS.PHONE] || '',
    [STUDENT_FIELD_KEYS.ADDRESS]: formData[STUDENT_FIELD_KEYS.ADDRESS] || '',
    [STUDENT_FIELD_KEYS.STATUS]: formData[STUDENT_FIELD_KEYS.STATUS] || 'Active',
    [STUDENT_FIELD_KEYS.ADMISSION_DATE]: formData[STUDENT_FIELD_KEYS.ADMISSION_DATE] || '',
    [STUDENT_FIELD_KEYS.GUARDIAN]: formData[STUDENT_FIELD_KEYS.GUARDIAN] || '',
    [STUDENT_FIELD_KEYS.AVATAR]: formData[STUDENT_FIELD_KEYS.AVATAR] || '',
    [STUDENT_FIELD_KEYS.FEE_STATUS]: formData[STUDENT_FIELD_KEYS.FEE_STATUS] || 'Paid',
    [STUDENT_FIELD_KEYS.IS_PROMOTED]: Boolean(formData[STUDENT_FIELD_KEYS.IS_PROMOTED]),
    [STUDENT_FIELD_KEYS.IS_BLOCKED]: Boolean(formData[STUDENT_FIELD_KEYS.IS_BLOCKED]),
  };
}

/**
 * Safe accessor for table mapping and component data lookup
 */
export function getStudentValue(student: Record<string, any> | undefined | null, key: StudentFieldKey, defaultValue: any = ''): any {
  if (!student) return defaultValue;
  return student[key] ?? defaultValue;
}
