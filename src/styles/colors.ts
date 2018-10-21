import tinycolor from "tinycolor2";

const TRANSPARENT = "transparent";
const PRIMARY = "#261315";
const BACKGROUND = tinycolor(PRIMARY)
  .darken(25)
  .toString();

const DARK = "#333";
const LIGHT = "#AAA";
const TINT = "#FFF";
const SUCCESS = "#006400";
const ERROR = "#FF3333";
const DISCREET = "#86939E";

const FEMALE = "#FE2E64";
const MALE = "#58D3F7";
const NEUTRAL = "#A901DB";

const OVERLAY = tinycolor(DARK)
  .setAlpha(0.7)
  .toString();

export default {
  TRANSPARENT: TRANSPARENT,
  BACKGROUND: BACKGROUND,
  DISCREET: DISCREET,
  DARK: DARK,
  LIGHT: LIGHT,
  OVERLAY: OVERLAY,
  PRIMARY: PRIMARY,
  TINT: TINT,
  SUCCESS: SUCCESS,
  ERROR: ERROR,
  FEMALE: FEMALE,
  MALE: MALE,
  NEUTRAL: NEUTRAL
};
