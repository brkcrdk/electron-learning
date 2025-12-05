import Icon from '../../../../components/ui/icon';

interface Props {
  title: string;
  description: string;
}

function Header({ title, description }: Props) {
  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="bg-accent/20 rounded-full p-4">
        <Icon
          name="shield-check"
          className="text-accent size-8"
        />
      </div>
      <h1 className="card-title text-2xl">{title}</h1>
      <p className="text-base-content/70 text-sm leading-relaxed">{description}</p>
    </div>
  );
}

export default Header;
