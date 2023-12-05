import { Palette } from "@mui/material/styles/createPalette";

const typography = (palette: Palette) => {
  return {
    h1: {
      color: palette.primary.dark,
      fontWeight: 600,
      fontSize: "60px",
      letterSpacing: "-0.24px",
      lineHeight: "40px",
      padding: "40px",
    },

    subtitle1: {
      color: palette.primary.light,
      fontSize: "20px",
      letterSpacing: "-0.05px",
      lineHeight: "25px",
    },
    subtitle2: {
      color: palette.primary.dark,
      fontWeight: 400,
      fontSize: "18px",
      letterSpacing: "-0.05px",
      lineHeight: "21px",
      padding: "10px 40px",
    },
    body1: {
      color: palette.primary.light,
      fontSize: `16px`,
      letterSpacing: "-0.05px",
      lineHeight: "21px",
      padding: "8px 0px",
    },
    body2: {
      color: palette.primary.light,
      fontSize: `16px`,
      letterSpacing: "-0.04px",
      lineHeight: "18px",
    },
  };
};
export default typography;
