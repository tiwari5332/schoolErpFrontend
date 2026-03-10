import { ReactNode } from "react";

export type PortalKey =
  | "admin"
  | "parent"
  | "teacher"
  | "student"
  | "mobile-teacher"
  | "mobile-parent"
  | "ai-analytics"
  | "finance"
  | "selection";

export interface PortalOption {
  key: PortalKey;
  title: string;
  description: string;
  icon: ReactNode;
  badgeIcon?: ReactNode;
  colorClass: string;
  features: string[];
}
