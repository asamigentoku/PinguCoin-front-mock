import { Link } from "@/i18n/navigation";
import { formatPoints } from "@/lib/points";
import { getPoints } from "@/lib/shop";

export async function PointBalance() {
  const points = await getPoints().catch(() => null);
  if (!points) return null;
  return (
    <Link className="point-balance" href="/points" aria-label={`保有ポイント ${formatPoints(points.balance)}ポイント`}>
      <span className="point-balance-coin" aria-hidden="true">P</span>
      <span>{formatPoints(points.balance)}<small> pt</small></span>
    </Link>
  );
}
