import React from 'react';
import { Nav, Button, Container } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useWindowSize } from 'react-use';
import { useAppContext } from '../App';
import { TABLES } from '../lib/airtable';
import breakpoints from '../lib/breakpoints';

type Props = {
  handleNext: Function;
  handleBack: Function;
  handleReset: Function;
};

const Navigation: React.FC<Props> = ({ handleNext, handleBack, handleReset }) => {
  const { currentStep, filters } = useAppContext();
  const { width: winWidth } = useWindowSize();
  const issuesFilterCount = filters?.filter((f) => f.key === TABLES.ISSUES).length || 0;

  return (
    <section className="fixed-bottom py-1 py-lg-2" style={{ backgroundColor: '#ECF7F6' }}>
      <Container>
        <Nav
          className={`d-flex ${currentStep === 4 ? 'justify-content-start' : ''} ${
            currentStep === 1 ? 'justify-content-end' : 'justify-content-between'
          }`}
        >
          <Nav.Item>
            {currentStep !== 1 && (
              <Button
                variant="outline-info"
                size={winWidth > breakpoints.md ? 'lg' : undefined}
                className="text-uppercase"
                onClick={() => handleBack()}
              >
                <FaArrowLeft /> Back
              </Button>
            )}
          </Nav.Item>
          <Nav.Item>
            {currentStep === 4 ? (
              <Button
                variant="outline-info"
                size={winWidth > breakpoints.md ? 'lg' : undefined}
                className="text-uppercase"
                onClick={() => handleReset()}
              >
                Start Over
              </Button>
            ) : (
              <Button
                variant="info"
                className="text-uppercase"
                size={winWidth > breakpoints.md ? 'lg' : undefined}
                onClick={() => handleNext()}
                disabled={
                  currentStep === 2
                    ? issuesFilterCount > 0 && issuesFilterCount <= 3
                      ? false
                      : true
                    : false
                }
              >
                {currentStep === 1 ? 'Begin' : 'Next'} <FaArrowRight />
              </Button>
            )}
          </Nav.Item>
        </Nav>
      </Container>
    </section>
  );
};

export default Navigation;
