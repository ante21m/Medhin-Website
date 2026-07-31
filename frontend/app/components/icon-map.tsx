// app/components/icon-map.tsx
import React, { type ReactNode } from "react";
import {
  Ambulance,
  Baby,
  FlaskConical,
  Scissors,
  Scan,
  Radar,
  Brain,
  HeartPulse,
} from "lucide-react";

export const iconMap: Record<string, ReactNode> = {
  ambulance: <Ambulance size={32} />,
  baby: <Baby size={32} />,
  flask: <FlaskConical size={32} />,
  scissors: <Scissors size={32} />,
  scan: <Scan size={32} />,
  radar: <Radar size={32} />,
  brain: <Brain size={32} />,
  heart: <HeartPulse size={32} />,
};
