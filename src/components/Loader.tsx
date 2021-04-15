import { Spinner } from 'react-bootstrap';

type Props = {
  variant?: string;
};

const Loader: React.FC<Props> = ({ variant = 'dark' }) => (
  <div className="d-flex justify-content-center">
    <Spinner animation="border" role="status" variant={variant}>
      <span className="sr-only">Loader...</span>
    </Spinner>
  </div>
);

export default Loader;
