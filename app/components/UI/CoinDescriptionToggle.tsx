type CoinDescriptionToggleProps = {
  coinName: string;
  description: string;
};

export default function CoinDescriptionToggle({
  coinName,
  description,
}: CoinDescriptionToggleProps) {
  return (
    <details className="cursor-pointer">
      <summary>Click here to view the full {coinName} description.</summary>
      <p>{description}</p>
    </details>
  );
}
