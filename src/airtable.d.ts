type Attachment = {
  filename: string;
  id: string;
  size: number;
  type: string;
  url: string;
};

type Base = {
  id: string;
  createdTime: string;
};

type Issue = Base & {
  fields: {
    Name: string;
    Image: Attachment[];
    Resources: string[];
    'Case Studies': string[];
    'Challenges and Obstacles': string[];
    'Service Recommendations': string[];
  };
};

type Gender = Base & {
  fields: {
    Name: string;
    Resources: string[];
    'Case Studies': string[];
    'Challenges and Obstacles': string[];
    'Service Recommendations': string[];
  };
};

type AgeRange = Base & {
  fields: {
    Name: string;
    Resources: string[];
    'Case Studies': string[];
    'Challenges and Obstacles': string[];
    'Service Recommendations': string[];
  };
};

type Other = Base & {
  fields: {
    Name: string;
    Image: Attachment[];
    Resources: string[];
    'Case Studies': string[];
    'Challenges and Obstacles': string[];
    'Service Recommendations': string[];
  };
};

type ChallengeAndObstacle = Base & {
  fields: {
    Challenge: string;
    Suggestion: string;
    Issues: string[];
    Gender: string[];
    'Age Range': string[];
    Other: string[];
  };
};

type ServiceRecommendation = Base & {
  fields: {
    Description: string;
    Link: string;
    Select: string;
    Issues: string[];
    Gender: string[];
    'Age Range': string[];
    Other: string[];
  };
};

type OnlineResource = Base & {
  fields: {
    Name: string;
    Description: string;
    Link: string;
    Issues: string[];
    Gender: string[];
    'Age Range': string[];
    Other: string[];
  };
};

type CaseStudy = Base & {
  fields: {
    Name: string;
    'Beneficiary profile': string;
    'Agreed action plan': string;
    "What's helped": string;
    "What didn't help": string;
    Issues: string[];
    Gender: string[];
    'Age Range': string[];
    Other: string[];
  };
};
