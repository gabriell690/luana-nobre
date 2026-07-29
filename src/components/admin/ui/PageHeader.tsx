import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function PageHeader({
  title,
  description,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <h1 className="text-3xl font-bold text-zinc-900">
          {title}
        </h1>

        {description && (
          <p className="mt-2 text-zinc-500">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center">
          {action}
        </div>
      )}
    </div>
  );
}