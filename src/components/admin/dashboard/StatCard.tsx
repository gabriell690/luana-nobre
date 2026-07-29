import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: string;
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = "#C89A2D",
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-zinc-500">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-zinc-900">
            {value}
          </h2>

          {subtitle && (
            <p className="mt-2 text-sm text-zinc-400">
              {subtitle}
            </p>
          )}
        </div>

        <div
          className="flex h-14 w-14 items-center justify-center rounded-2xl"
          style={{ backgroundColor: `${color}20` }}
        >
          <Icon
            size={28}
            style={{ color }}
          />
        </div>

      </div>

    </div>
  );
}