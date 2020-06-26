import { blueGrey, grey } from '@material-ui/core/colors';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

// remember preference for next time user visits
const storeColorTheme = (themeName) => {
  localStorage.setItem('theme', themeName);
};

// if user has been here before return their pref
// else try detect from browser preference
export const detectColorTheme = () => {
  const lsTheme = localStorage.getItem('theme');
  if (lsTheme && (lsTheme === 'light' || lsTheme === 'dark')) {
    return lsTheme;
  }
  let theme = 'light';
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    theme = 'dark';
  }
  storeColorTheme(theme);
  return theme;
};

export const toggleColorTheme = () => {
  const lsTheme = localStorage.getItem('theme');
  const theme = lsTheme === 'dark' ? 'light' : 'dark';
  storeColorTheme(theme);
  return theme;
};

const globalOverrides = (theme) => {
  return {
    MuiCssBaseline: {
      '@global': {
        html: {
          fontSmoothing: 'auto',

          fontSize: 16,
          [theme.breakpoints.up('sm')]: {
            fontSize: 18,
          },
        },
        img: {
          display: 'block',
        },
        a: {
          color: 'inherit',
        },
      },
    },
  };
};

const themes = {
  light: responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: 'light',
        background: {
          paper: blueGrey[50],
          default: grey[300],
        },
      },
    }),
    { breakpoints: ['xs', 'sm'], factor: 2 }
  ),
  dark: responsiveFontSizes(
    createMuiTheme({
      palette: {
        type: 'dark',
        background: {
          paper: blueGrey[800],
          default: grey[800],
        },
      },
    }),
    { breakpoints: ['xs', 'sm'], factor: 2 }
  ),
};

themes.light.overrides = globalOverrides(themes.light);
themes.dark.overrides = globalOverrides(themes.dark);

export default themes;
