import { scale } from "./scaling";
import { StyleSheet } from "react-native";
import { COLORS } from ".";

export const FONT_SIZE = {
  small: scale(12),
  normal: scale(14),
  large: scale(16),
  larger: scale(18)
};
export const LINE_HEIGHT = {
  small: scale(18),
  normal: scale(21),
  large: scale(24),
  larger: scale(27)
};
export const SPACING = {
  small: scale(8),
  medium: scale(16),
  large: scale(24),
  larger: scale(32)
};

export const ICON_SIZE = {
  small: scale(18),
  medium: scale(24),
  normal: scale(32),
  big: scale(40)
};

const text = StyleSheet.create({
  normal: {
    fontSize: FONT_SIZE.normal,
    color: COLORS.TINT,
    lineHeight: LINE_HEIGHT.normal
  },
  small: {
    color: COLORS.TINT,
    fontSize: FONT_SIZE.small,
    lineHeight: LINE_HEIGHT.small
  },
  big: {
    color: COLORS.TINT,
    fontSize: FONT_SIZE.large,
    lineHeight: LINE_HEIGHT.large
  },
  bold: {
    color: COLORS.TINT,
    fontWeight: "bold"
  }
});

const container = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center"
  },
  centered: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
    justifyContent: "center"
  },
  top: {
    textAlign: "center"
  },
  default: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND
  }
});

const list = StyleSheet.create({
  container: {
    borderBottomColor: COLORS.LIGHT,
    borderBottomWidth: 1,
    backgroundColor: COLORS.BACKGROUND
  },
  title: {
    color: COLORS.TINT,
    fontWeight: "bold",
    fontSize: FONT_SIZE.normal
  },
  subtitle: {
    fontSize: FONT_SIZE.small,
    color: COLORS.LIGHT
  },
  rightTitle: {
    textAlign: "center",
    fontSize: FONT_SIZE.normal,
    margin: "auto",
    color: COLORS.TINT
  }
});
export { text, container, list };
