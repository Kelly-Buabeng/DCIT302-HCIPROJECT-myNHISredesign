import { Feather } from "@expo/vector-icons";
import { ComponentProps } from "react";

export type IconName = ComponentProps<typeof Feather>["name"];

/** Feather: one thin, consistent line-icon set across the app. */
export default function Icon({ size = 20, ...props }: ComponentProps<typeof Feather>) {
  return <Feather size={size} {...props} />;
}
