import React from 'react';

const Intro: React.FC = () => {
  return (
    <>
      <p>
        Our social prescribing support tool may be useful in helping you to understand the needs,
        goals, and service requirements of someone who needs help. It also provides resources and
        case studies that may be of use to you.
      </p>
      <img className="w-100 mb-3" src="/images/homepage.png" alt="Photos of different people" />
      <p>
        It works by understanding issues and challenges of someone who needs help, and provides
        recommendations, resources and information. The data is drawn from link workers and social
        prescribers experiences’ with people who require support.
      </p>
      <p className="font-weight-bold">
        This tool isn’t meant be to prescriptive, or a definitive description of any one person.
        It’s intended to provide ideas about how you can help someone in need - even if that someone
        is you.
      </p>
      <p>Click begin below to start.</p>
    </>
  );
};

export default Intro;
