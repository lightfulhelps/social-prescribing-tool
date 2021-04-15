import { Card } from 'react-bootstrap';
import { FaExternalLinkAlt } from 'react-icons/fa';

type Props = {
  title: string;
  body: string;
  ctaText: string;
  link?: string;
};

const ResultCard: React.FC<Props> = ({ title, body, ctaText, link }) => {
  return (
    <Card className="h-100 border-0">
      <Card.Header className="border-0 text-white h5 mb-0" style={{ backgroundColor: '#420B57' }}>
        {title}
      </Card.Header>
      <Card.Body>
        <Card.Text>{body}</Card.Text>
        {link && (
          <Card.Link
            className="d-flex align-items-center text-uppercase text-info font-weight-bold text-decoration-underline"
            href={link}
            target="_blank"
          >
            {ctaText} <FaExternalLinkAlt className="ml-1" />
          </Card.Link>
        )}
      </Card.Body>
    </Card>
  );
};

export default ResultCard;
