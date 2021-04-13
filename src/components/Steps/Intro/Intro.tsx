import React from 'react';
import { Figure } from 'react-bootstrap';

export interface IntroProps {}

const Intro: React.SFC<IntroProps> = () => {
  return (
    <div>
      <p>
        Our social prescribing support tool may be useful in helping you to understand the needs,
        goals, and service requirements of someone who needs help. It also provides resources and
        case studies that may be of use to you.
      </p>
      <Figure.Image
        width={860}
        height={186}
        alt="171x180"
        src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80"
      />
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
    </div>
  );
};

export default Intro;
