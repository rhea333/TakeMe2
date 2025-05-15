import { registerUser, RegistrationRequest } from '@/api/users';
import { createContext, useContext, useState, ReactNode } from 'react';

type RegistrationData = {
  email: string;
  name: string;
  degreeType: string;
  program: string;
  year: string;

  isDriver: boolean;
  firstName: string;
  lastName: string;
  password: string;
  pronouns: string;
  birthday: string; // ISO string
  schoolIDUri: string | null;

  pfpUri: string | null;
  bio: string;
  interests: string[];

  licenseUri: string | null;
  make: string;
  model: string;
  plateNumber: string;
};

const defaultData: RegistrationData = {
  email: '',
  name: '',
  degreeType: '',
  program: '',
  year: '',

  isDriver: false,
  firstName: '',
  lastName: '',
  password: '',
  pronouns: '',
  birthday: '2025-05-14T21:55:04.802Z',
  schoolIDUri: null,

  pfpUri: null,
  bio: '',
  interests: [],

  licenseUri: null,
  make: '',
  model: '',
  plateNumber: '',
};

const RegistrationContext = createContext<{
  data: RegistrationData;
  setData: (data: Partial<RegistrationData>) => void;
  finishRegistration: () => Promise<string | null>;
}>({
  data: defaultData,
  setData: () => { },
  finishRegistration: async () => { return null },
});

export const useRegistration = () => useContext(RegistrationContext);

export const RegistrationProvider = ({ children }: { children: ReactNode }) => {
  const [data, setRegistrationData] = useState<RegistrationData>(defaultData);

  const setData = (newData: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...newData }));
  };

  const finishRegistration = async () => {
    let req: RegistrationRequest = {
      school: {
        email: data.email,
        name: data.name,
        type: data.degreeType,
        program: data.program,
        year: +data.year,
      },
      general: {
        first_Name: data.firstName,
        last_Name: data.lastName,
        password: data.password,
        pronouns: data.pronouns,
        birthday: data.birthday,
      },
      profile: {
        bio: data.bio,
        interests: data.interests.toString(),
      }
    };
    if (data.make != null || data.model != '' || data.plateNumber != '') {
      console.log("h")
      console.log(data.make != null)
      console.log(data.model)
      console.log(data.plateNumber)
      req = {
        ...req,
        car_Info: {
          make: data.make,
          model: data.model,
          plate_Num: data.plateNumber,
        }
      }
    }
    return await registerUser(req);
  };

  return (
    <RegistrationContext.Provider value={{ data, setData, finishRegistration }}>
      {children}
    </RegistrationContext.Provider>
  );
};
