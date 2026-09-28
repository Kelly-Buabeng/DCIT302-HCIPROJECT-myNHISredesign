import { Text, TextProps } from "react-native";
import { color, text } from "../theme";

type Variant = keyof typeof text;

interface TProps extends TextProps {
  v?: Variant;
  c?: string;
  center?: boolean;
}

/** All app text goes through here so the font and scale stay consistent. */
export default function T({ v = "body", c = color.ink, center, style, ...rest }: TProps) {
  return <Text {...rest} style={[text[v], { color: c }, center && { textAlign: "center" }, style]} />;
}
