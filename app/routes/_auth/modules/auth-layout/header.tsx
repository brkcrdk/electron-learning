import Card from '@app/components/ui/card';
import Icon from '@app/components/ui/icon';

interface Props {
  title: string;
  description: string;
}

function Header({ title, description }: Props) {
  return (
    <Card.Header className="place-items-center gap-4 text-center">
      <Icon
        name="shield-check"
        className="size-10"
      />
      <Card.Title>{title}</Card.Title>
      <Card.Description>{description}</Card.Description>
    </Card.Header>
  );
}

export default Header;
