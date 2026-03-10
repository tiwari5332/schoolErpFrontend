import React from "react";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { PortalOption } from "../../types";

interface Props {
  option: PortalOption;
  onSelect: (key: PortalOption["key"]) => void;
}

export const PortalCard: React.FC<Props> = ({ option, onSelect }) => {
  const colour = option.colorClass;
  return (
    <Card
      className={`relative overflow-hidden border-0 shadow-xl hover-lift glass-card group cursor-pointer`}
      onClick={() => onSelect(option.key)}
    >
      <div
        className={`absolute inset-0 gradient-${colour} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
      />
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-${colour}-100 rounded-full -translate-y-16 translate-x-16 opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
      />
      <CardContent className="p-6 relative">
        <div className="flex items-center justify-between mb-6">
          <div
            className={`h-12 w-12 rounded-2xl gradient-${colour} flex items-center justify-center shadow-colored-${colour} group-hover:scale-110 transition-transform duration-300`}
          >
            {option.icon}
          </div>
          <Badge
            className={`bg-${colour}-100 text-${colour}-800 border-${colour}-200 gap-1`}
          >
            {option.badgeIcon}
            {option.title}
          </Badge>
        </div>

        <h3 className={`text-xl font-bold text-${colour}-900 mb-3`}>{option.title} Portal</h3>
        <p className="text-slate-600 mb-6 leading-relaxed text-sm">
          {option.description}
        </p>

        <div className="space-y-2 mb-6">
          {option.features.map((f) => (
            <div
              key={f}
              className="flex items-center gap-2 text-xs text-slate-600"
            >
              <span>•</span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        <Button className={`w-full gradient-${colour} text-white shadow-colored-${colour} hover:scale-[1.02] transition-all duration-200 group`}>
          <span>Access {option.title}</span>
          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
        </Button>
      </CardContent>
    </Card>
  );
};
