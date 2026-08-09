import type { Credit } from "../data/projects";

type CreditListProps = {
  credits?: Credit[];
  className?: string;
};

export function CreditList({ credits, className = "" }: CreditListProps) {
  if (!credits?.length) return null;

  return (
    <dl className={`text-fine ${className}`}>
      {credits.map(({ label, value }, index) => (
        <div key={`${label}-${index}`}>
          <dt className="inline text-ink-muted">{label}</dt>{" "}
          <dd className="inline">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
