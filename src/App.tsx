import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Demographics from './components/Steps/Demographics';
import Intro from './components/Steps/Intro';
import Issues from './components/Steps/Issues';
import Results from './components/Steps/Results';
import Progress from './components/Progress';

export type Choices = {
  issues: string[];
  demographics: string[];
  gender: string;
  age: string;
};

type ContextProps = {
  choices: Choices;
  setChoices: (values: Choices) => void;
  currentStep: number;
};

export const AppContext = React.createContext<Partial<ContextProps>>({});

export const useAppContext = () => React.useContext(AppContext);

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
        currentStep,
      }}
    >
      <Hero />
      <Container style={{ paddingBottom: '100px' }}>
        {currentStep !== 4 && (
          <Row>
            <Progress />
            <Col>
              {currentStep === 1 && <Intro />}
              {currentStep === 2 && <Issues />}
              {currentStep === 3 && <Demographics />}
            </Col>
          </Row>
        )}
        {currentStep === 4 && <Results />}
      </Container>
      <Navigation handleNext={handleNext} handleBack={handleBack} handleReset={handleReset} />
    </AppContext.Provider>
  );
};

export default App;
