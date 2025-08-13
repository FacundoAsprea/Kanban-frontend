import type { DataItemProps } from "@/types/components";

export default function DataItem({ dd, dt, ddClassName, dtClassName }: DataItemProps) {
  return (
    <div className="flex items-start gap-3">
      <dt className={`my-auto ${dtClassName}`}>{dt}</dt>
      <dd className={ddClassName}>{dd}</dd>
    </div>
  );
}
