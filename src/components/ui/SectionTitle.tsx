interface Props {
  subtitle?: string;
  title: string;
  description?: string;
}

export default function SectionTitle({
  subtitle,
  title,
  description,
}: Props) {
  return (
    <div className="mb-14 text-center">
      {subtitle && (
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-[#C89A2D]">
          {subtitle}
        </span>
      )}

      <h2 className="mt-3 text-4xl font-bold text-[#111111]">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
}