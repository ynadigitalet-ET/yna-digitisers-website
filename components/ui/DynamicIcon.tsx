import {
  Globe,
  ShoppingCart,
  Briefcase,
  RefreshCw,
  Wrench,
  TrendingUp,
  Zap,
  Palette,
  Search,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Globe,
  ShoppingCart,
  Briefcase,
  RefreshCw,
  Wrench,
  TrendingUp,
  Zap,
  Palette,
  Search,
  Smartphone,
};

export function DynamicIcon({ name, className }: { name: string; className?: string }) {
  const Icon = iconMap[name] || Globe;
  return <Icon className={className} />;
}

export { iconMap };
