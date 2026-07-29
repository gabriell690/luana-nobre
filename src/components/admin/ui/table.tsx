import type { HTMLAttributes, TableHTMLAttributes } from "react";

export function Table({
  className = "",
  ...props
}: TableHTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full border-collapse ${className}`}
        {...props}
      />
    </div>
  );
}

export function TableHeader({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <thead
      className={`bg-gray-50 border-b ${className}`}
      {...props}
    />
  );
}

export function TableBody({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableSectionElement>) {
  return (
    <tbody
      className={className}
      {...props}
    />
  );
}

export function TableRow({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={`border-b hover:bg-gray-50 transition-colors ${className}`}
      {...props}
    />
  );
}

export function TableHead({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`px-4 py-3 text-left text-sm font-semibold text-gray-700 ${className}`}
      {...props}
    />
  );
}

export function TableCell({
  className = "",
  ...props
}: HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`px-4 py-3 text-sm text-gray-700 ${className}`}
      {...props}
    />
  );
}