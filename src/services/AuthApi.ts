import authService from '../api/services/authService';
import { getOrCreateDeviceId } from '../utils/deviceId';

export class AuthApi {
  static async login(msisdn: string, password: string): Promise<any> {
    const deviceId = getOrCreateDeviceId();
    return authService.loginAdmin({ msisdn, password, deviceId });
  }

  static async signup(userData: any): Promise<any> {
    return authService.registerAdmin({
      fullName: userData.name || userData.fullName || userData.adminName,
      mobileNo: userData.mobile || userData.mobileNo || userData.adminMobile,
      schoolName: userData.schoolName,
      emailAddress: userData.email || userData.emailAddress || userData.adminEmail,
      password: userData.password,
      confirmPassword: userData.confirmPassword || userData.password,
      schoolCode: userData.schoolCode,
      affiliationBoard: userData.affiliationBoard,
      schoolType: userData.schoolType,
      schoolEmail: userData.schoolEmail,
      schoolPhone: userData.schoolPhone,
      website: userData.website,
      establishedYear: userData.establishedYear,
      address: userData.address,
      city: userData.city,
      state: userData.state,
      postalCode: userData.postalCode,
      country: userData.country,
      designation: userData.designation || userData.adminDesignation,
    });
  }

  static async forgotPassword(emailOrMobile: string): Promise<any> {
    return authService.forgotPassword({ emailOrMobile });
  }

  static async resetPassword(data: { emailOrMobile: string; otp: string; newPassword: string }): Promise<any> {
    return authService.resetPassword(data);
  }
}
