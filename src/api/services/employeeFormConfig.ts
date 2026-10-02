import httpClient from '../httpClient';

export interface FormSectionConfig {
  enabled: boolean;
  title?: string;
}

export interface EmployeeFormConfig {
  profile: FormSectionConfig;
  employment: FormSectionConfig;
  payroll: FormSectionConfig;
}

export const DEFAULT_EMPLOYEE_FORM_CONFIG: EmployeeFormConfig = {
  profile: { enabled: true, title: "Profile" },
  employment: { enabled: true, title: "Employment" },
  payroll: { enabled: false, title: "Payroll" }
};

/**
 * Service to fetch dynamic form section configuration from API endpoint.
 * Fallback to DEFAULT_EMPLOYEE_FORM_CONFIG if endpoint is unavailable.
 */
export const employeeFormConfigService = {
  async getFormConfig(): Promise<EmployeeFormConfig> {
    try {
      const response = await httpClient.get<Partial<EmployeeFormConfig>>('/api/config/employee-form');
      if (response.data) {
        return {
          profile: { ...DEFAULT_EMPLOYEE_FORM_CONFIG.profile, ...response.data.profile },
          employment: { ...DEFAULT_EMPLOYEE_FORM_CONFIG.employment, ...response.data.employment },
          payroll: { ...DEFAULT_EMPLOYEE_FORM_CONFIG.payroll, ...response.data.payroll }
        };
      }
      return DEFAULT_EMPLOYEE_FORM_CONFIG;
    } catch (e) {
      console.info('[employeeFormConfigService] Using default form section configuration:', e);
      return DEFAULT_EMPLOYEE_FORM_CONFIG;
    }
  }
};

export default employeeFormConfigService;
