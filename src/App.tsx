import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Demographics from './components/Steps/Demographics';
import Intro from './components/Steps/Intro';
import Issues from './components/Steps/Issues';
import Results from './components/Steps/Results';
import Progress from './components/Progress';
import { addOrRemoveFilter, addOrReplaceFilter } from './lib/filtering';
import { TABLES } from './lib/base';

export type Filter = {
  [key: string]: string;
};

type HandleFilterArgs = {
  key: string;
  id: string;
  name: string;
};

export const AppContext = React.createContext<
  Partial<{
    currentStep: number;
    filters: Filter[];
    handleFilter: (args: HandleFilterArgs) => void;
    clearFiltersByKey: (key: string) => void;
  }>
>({});

export const useAppContext = () => React.useContext(AppContext);

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = React.useState<number>(1);
  const [filters, setFilters] = React.useState<Filter[]>([]);

  const handleFilter = ({ key, id, name }: HandleFilterArgs) => {
    let newFilters;

    if ([TABLES.GENDER, TABLES.AGE_RANGE].includes(key)) {
      newFilters = addOrReplaceFilter(filters, { key, id, name });
    } else {
      newFilters = addOrRemoveFilter(filters, { key, id, name });
    }

    setFilters(newFilters);
  };

  const clearFiltersByKey = (key: string) => {
    const newFilters = filters.filter((f) => f.key !== key);

    setFilters(newFilters);
  };

  const handleNext = () => {
    if (currentStep === 4) return;
    setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  };

  const handleReset = () => {
    setCurrentStep(1);
    setFilters([]);
  };

  return (
    <AppContext.Provider
      value={{
        currentStep,
        filters,
        handleFilter,
        clearFiltersByKey,
      }}
    >
      <Hero />
      <Container
        className={`${currentStep === 4 ? 'px-0' : ''}`}
        fluid={currentStep === 4}
        style={{ paddingBottom: '160px' }}
      >
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
