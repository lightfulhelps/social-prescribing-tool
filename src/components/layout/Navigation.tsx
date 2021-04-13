import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { StyledButton } from '../Styles';
import { AppContext } from '../../App';

export interface NavigationProps {
  currentStep: number;
  handleNext: Function;
  handleBack: Function;
  handleReset: Function;
}

const Navigation: React.SFC<NavigationProps> = ({
  currentStep,
  handleNext,
  handleBack,
  handleReset,
}) => {
  const { choices } = React.useContext(AppContext);

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
            <StyledButton variant="info" onClick={() => handleNext()}>
              Begin →
            </StyledButton>
          </Nav.Item>
        ) : (
          <>
            <Nav.Item>
              <StyledButton
                variant="white"
                className="text-info bg-white border-info"
                onClick={() => handleBack()}
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </StyledButton>
            </Nav.Item>
            <Nav.Item>
              {currentStep === 4 && (
                <>
                  <StyledButton
                    variant="white"
                    className="text-info border-info ml-4"
                    onClick={() => handleReset()}
                  >
                    Start Over
                  </StyledButton>
                </>
              )}
              {currentStep !== 4 && (
                <StyledButton
                  variant="info"
                  className="ml-4"
                  onClick={() => handleNext()}
                  disabled={
                    currentStep === 2
                      ? choices.issues.length === 0 || choices.issues.length > 3
                      : false
                  }
                >
                  Next <FontAwesomeIcon icon={faArrowRight} />
                </StyledButton>
              )}
            </Nav.Item>
          </>
        )}
      </Nav>
    </section>
  );
};

export default Navigation;
