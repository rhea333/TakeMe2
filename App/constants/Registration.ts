export const RegistrationPageOrder = ['1_school', '2_general', '3_profile', '4_car_info', '5_payment_info'] as const;

export type RegistrationPageKey = typeof RegistrationPageOrder[number];

export const RegistrationPageSubtitles: Record<RegistrationPageKey, string> = {
  '1_school': 'School',
  '2_general': 'General',
  '3_profile': 'Profile',
  '4_car_info': 'Car Information',
  '5_payment_info': 'Payment Information',
};

type RegistrationValidationRegexesType = {
  email: RegExp;
  program: RegExp;
  year: RegExp;
  firstName: RegExp;
  lastName: RegExp;
  password: RegExp;
  plateNumber: RegExp;
}

export const RegistrationValidationRegexes: RegistrationValidationRegexesType = {
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  program: /^.{3,60}$/,
  year: /^(\d|1[1-4])$/,
  firstName: /.+/,
  lastName: /.+/,
  password: /^[-\w?!]{8,20}$/,
  plateNumber: /^[A-Z]{3,4}[-\s]?\d{3,4}$/
};