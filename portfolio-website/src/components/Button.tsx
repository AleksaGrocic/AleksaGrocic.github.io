export default function Button({
  name,
  className,
  onClick,
}: {
  name: string;
  className: string;
  onClick?: () => void;
}) {
  return (
    <button className={className} onClick={onClick}>
      {name}
    </button>
  );
}
