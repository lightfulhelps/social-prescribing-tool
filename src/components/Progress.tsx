import React from 'react';
import { Button, Col } from 'react-bootstrap';

export interface ProgressProps {
  steps: string[];
  currentStep: number;
}

const Divider: React.FC<{ active: boolean }> = ({ active }) => (
  <span
    style={{
      zIndex: -1,
      left: '12px',
      height: 'inherit',
      borderLeft: `4px dotted ${active ? '#ffc200' : '#8E2082'}`,
      opacity: active ? 1 : 0.5,
      position: 'relative',
      width: '50px',
    }}
  />
);

const Progress: React.FC<ProgressProps> = ({ steps, currentStep }) => {
  return (
    <Col sm={3} className="flex-column">
      <ul className="pl-0">
        {steps.map((step, i) => (
          <div key={i}>
            <li className="list-unstyled d-flex align-items-center">
              <div
                className="rounded-circle d-inline-block"
                style={{
                  width: '25px',
                  height: '25px',
                  backgroundColor: currentStep === i + 1 ? '#ffc200' : '#8e2082',
                  opacity: currentStep === i + 1 ? 1 : 0.5,
                }}
              />
              <Button
                variant="link"
                className={`text-left text-dark font-weight-bold ${
                  currentStep === i + 1 ? '' : 'text-muted'
                }`}
                style={{ opacity: currentStep === i + 1 ? 1 : 0.5 }}
              >
                {step.toUpperCase()}
              </Button>
            </li>
            {i !== 3 && <Divider active={currentStep === i + 1} />}
          </div>
        ))}
      </ul>
    </Col>
  );
};

export default Progress;
