import { Palette } from "@mui/material/styles/createPalette";

const typography = (palette: Palette) => {
  return {
    h1: {
      color: palette.primary.dark,
      fontWeight: 500,
      fontSize: "35px",
      letterSpacing: "-0.24px",
      lineHeight: "40px",
    },
    h2: {
      color: palette.primary.dark,
      fontWeight: 500,
      fontSize: "29px",
      letterSpacing: "-0.24px",
      lineHeight: "32px",
    },
    h3: {
      color: palette.primary.dark,
      fontWeight: 500,
      fontSize: "23px",
      letterSpacing: "-0.06px",
      lineHeight: "26px",
    },
    subtitle1: {
      color: palette.primary.light,
      fontSize: "16px",
      letterSpacing: "-0.05px",
      lineHeight: "25px",
    },
    subtitle2: {
      color: palette.primary.light,
      fontWeight: 400,
      fontSize: "14px",
      letterSpacing: "-0.05px",
      lineHeight: "21px",
    },
    body1: {
      color: palette.primary.light,
      fontSize: `var(--fontSize)`,
      letterSpacing: "-0.05px",
      lineHeight: "21px",
    },
    body2: {
      color: palette.primary.light,
      fontSize: `calc(var(--fontSize) - 2px)`,
      letterSpacing: "-0.04px",
      lineHeight: "18px",
    },
  };
};
export default typography;
