type SchoolInfo = {
  email: string;
  name: string;
  type: string;
  program: string;
  year: number;
}

type GeneralInfo = {
  first_Name: string;
  last_Name: string;
  password: string;
  pronouns: string;
  birthday: string;
}

type ProfileInfo = {
  bio: string;
  interests: string;
}

type CarInfo = {
  make: string;
  model: string;
  plate_Num: string;
}

export type RegistrationRequest = {
  school: SchoolInfo;
  general: GeneralInfo;
  profile: ProfileInfo;
  car_Info?: CarInfo;
};

export const registerUser = async (req: RegistrationRequest): Promise<string | null> => {
  try {
    console.log(JSON.stringify(req));
    const response = await fetch('https://takeme2backend-b3gad5axanfkhnhg.canadacentral-01.azurewebsites.net/api/Users/registerUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return JSON.stringify(errorData) || 'Failed to submit registration';
    }

    const result = response.body;
    console.log('Registration submitted successfully:', result);
    return null;
  } catch (error: any) {
    console.error('Error submitting registration:', error);
    return error.message || 'Unknown error occurred';
  }
};
