import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";

export type IconName = ComponentProps<typeof Ionicons>["name"];

// One icon family across the whole app: Ionicons, outline for UI, filled for "active".
export default function Icon(props: ComponentProps<typeof Ionicons>) {
  return <Ionicons {...props} />;
}
