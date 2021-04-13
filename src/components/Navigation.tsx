import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { useAppContext } from '../App';

export interface NavigationProps {
  handleNext: Function;
  handleBack: Function;
  handleReset: Function;
}

const Navigation: React.FC<NavigationProps> = ({ handleNext, handleBack, handleReset }) => {
  const { choices, currentStep } = useAppContext();

  if (!choices) return <p>Error, no choices found.</p>;

  return (
    <section className="fixed-bottom py-2" style={{ backgroundColor: '#ECF7F6' }}>
      <Nav
        className={`container d-flex ${currentStep === 4 ? 'justify-content-start' : ''} ${
          currentStep === 1 ? 'justify-content-end' : 'justify-content-between'
        }`}
      >
        {currentStep === 1 ? (
          <Nav.Item>
            <Button variant="info" size="lg" onClick={() => handleNext()}>
              Begin <FaArrowRight />
            </Button>
          </Nav.Item>
        ) : (
          <>
            <Nav.Item>
              <Button
                variant="white"
                size="lg"
                className="text-info bg-white border-info"
                onClick={() => handleBack()}
              >
                <FaArrowLeft /> Back
              </Button>
            </Nav.Item>
            <Nav.Item>
              {currentStep === 4 && (
                <>
                  <Button
                    variant="white"
                    size="lg"
                    className="text-info border-info ml-4"
                    onClick={() => handleReset()}
                  >
                    Start Over
                  </Button>
                </>
              )}
              {currentStep !== 4 && (
                <Button
                  variant="info"
                  className="ml-4"
                  size="lg"
                  onClick={() => handleNext()}
                  disabled={
                    currentStep === 2
                      ? choices.issues.length === 0 || choices.issues.length > 3
                      : false
                  }
                >
                  Next <FaArrowRight />
                </Button>
              )}
            </Nav.Item>
          </>
        )}
      </Nav>
    </section>
  );
};

export default Navigation;
