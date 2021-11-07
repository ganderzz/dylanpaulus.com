export interface IWork {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface IEducation {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  courses: string[];
}

export interface IProfile {
  network: string;
  username: string;
  url: string;
}

export interface IPublication {
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
}

export interface IResume {
  basics: {
    name: string;
    label: string;
    image: string;
    email: string;
    url: string;
    summary: string;
    location: {
      city: string;
      countryCode: string;
      region: string;
    };
    profiles: Partial<IProfile>[];
  };
  work: Partial<IWork>[];
  volunteer: [];
  education: Partial<IEducation>[];
  awards: [];
  publications: Partial<IPublication>[];
  skills: Partial<{
    name: string;
    keywords: string[];
  }>[];
  languages: Partial<{
    language: string;
    fluency: string;
  }>[];
  interests: [];
  references: [];
  projects: [];
}
