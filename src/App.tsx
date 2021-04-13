import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Demographics from './components/Steps/Demographics';
import Intro from './components/Steps/Intro';
import Issues from './components/Steps/Issues';
import Results from './components/Steps/Results/Results';
import Progress from './components/Progress';

const steps = ['Introduction', 'Issues', 'Demographics', 'Results'];

export type Choices = {
  issues: string[];
  demographics: string[];
  gender: string;
  age: string;
};

type ContextProps = {
  choices: Choices;
  setChoices: (values: Choices) => void;
};

export const AppContext = React.createContext<Partial<ContextProps>>({});

const App: React.FunctionComponent = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [choices, setChoices] = React.useState<Choices>({
    issues: [],
    demographics: [],
    gender: '',
    age: '',
  });

  const handleNext = () => {
    if (currentStep === 4) return;
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setChoices({ issues: [], demographics: [], gender: '', age: '' });
    setCurrentStep(1);
  };

  console.log(choices);
  return (
    <AppContext.Provider
      value={{
        choices,
        setChoices,
      }}
    >
      <Hero currentStep={currentStep} />
      <Container>
        {currentStep !== 4 && (
          <Row>
            <Progress steps={steps} currentStep={currentStep} />
            <Col>
              {currentStep === 1 && <Intro />}
              {currentStep === 2 && <Issues />}
              {currentStep === 3 && <Demographics />}
            </Col>
          </Row>
        )}
        {currentStep === 4 && <Results />}
      </Container>
      <Navigation
        currentStep={currentStep}
        handleNext={handleNext}
        handleBack={handleBack}
        handleReset={handleReset}
      />
    </AppContext.Provider>
  );
};

export default App;
