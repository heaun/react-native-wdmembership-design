export enum PaymentAuthenticationMode {
  PINCODE = "PINCODE",
  BIOMETRIC = "BIOMETRIC"
}

export enum PaymentPasswordMode {
  REGISTER = "REGISTER",
  PAYMENT = "PAYMENT"
}

export interface PaymentSettings {
  authenticationMode: PaymentAuthenticationMode;
  passwordMode: PaymentPasswordMode;
  isPinCodeEnabled: boolean;
  isBiometricEnabled: boolean;
  pinCode: string;
}

export const defaultPaymentSettings: PaymentSettings = {
  authenticationMode: PaymentAuthenticationMode.PINCODE,
  passwordMode: PaymentPasswordMode.REGISTER,
  isPinCodeEnabled: false,
  isBiometricEnabled: false,
  pinCode: ""
};
