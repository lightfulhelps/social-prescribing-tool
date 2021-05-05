import React from 'react';
import { useAppContext } from '../App';

const Divider: React.FC<{ active: boolean }> = ({ active }) => (
  <span
    className="py-1 py-lg-2 py-xl-3"
    style={{
      display: 'block',
      zIndex: -1,
      left: '12px',
      borderLeft: `3px dashed ${active ? '#ffc200' : '#8E2082'}`,
      opacity: active ? 1 : 0.5,
      position: 'relative',
    }}
  />
);

const Progress: React.FC = () => {
  const { currentStep } = useAppContext();
  const steps = ['Introduction', 'Issues', 'Demographics', 'Results'];

  return (
    <ul className="p-0 m-0">
      {steps.map((step, i) => (
        <div key={i}>
          <li className="list-unstyled d-flex align-items-center">
            <div
              className={`rounded-circle d-inline-block ${
                currentStep === i + 1 ? 'bg-warning' : 'bg-secondary'
              }`}
              style={{
                width: '25px',
                height: '25px',
                opacity: currentStep === i + 1 ? 1 : 0.5,
              }}
            />
            <div
              className={`py-1 pl-2 text-dark font-weight-bold text-uppercase text-decoration-none ${
                currentStep === i + 1 ? '' : 'text-muted'
              }`}
              style={{ opacity: currentStep === i + 1 ? 1 : 0.5, lineHeight: 1 }}
            >
              {step}
            </div>
          </li>
          {i !== 3 && <Divider active={currentStep === i + 1} />}
        </div>
      ))}
    </ul>
  );
};

export default Progress;
