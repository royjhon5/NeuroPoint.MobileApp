export type UserSignInDto = {
  email: string;
  password: string;
};

export type UserSignUpDto = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  packageTypeId: number;
  roleId?: string;
  branchId: number;
  mobileNumber?: string;
  address?: string;
};

export type UserUpdateDto = {
  id: string;
  userName: string;
  email: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  professionalTitle: string;
  roleId: string;
  phoneNumber: string;
  address: string;
  licenseNumber: string;
  signature: string;
};

export type LoginResponseDto = {
  userId: string;
  token: string;
  firstName: string;
  lastName: string;
  email: string;
  roles: string[];
  phoneNumber: string;
  packageName: string;
  branchId: number;
  currentPackage: {
    studentPackageTypeId: number;
    paymentStatus: number;
    partnerId: number;
    price: number;
    packageTypeId: number;
  };
  isProfileApproved: boolean;
  profileFeedback: string;
};

export type CurrentUserDto = {
  id: string;
  token: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: string;
  email: string;
  currentPackage: {
    studentPackageTypeId: number;
    paymentStatus: number;
    packageName: string;
    partnerId: number;
    price: number;
    packageTypeId: number;
  };
  profile: string;
  roles: string[];
  branchId: number;
  profileFeedback: string;
  isProfileApproved: boolean;
};

export type UserRolesDto = {
  id: string;
  name: string;
};

export type GetUserDto = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  userName: string;
  professionalTitle: string;
  roleId: string;
  roles: string[];
  phoneNumber: string;
  address: string;
  licenseNumber: string;
};

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userName: string;
  branchId: number;
  roles: string[];
  profileFeedback: string;
  profile: string;
  isProfileApproved: boolean;
  package?: {
    packageName: string;
    price: string;
  };
  isDisabled: boolean;
}
