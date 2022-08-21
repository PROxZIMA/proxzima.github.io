import axios from 'axios';
import config from '../../config.json';

export const getProjects = async () => {
  const { data } = await axios.get(
    `https://api.github.com/users/${config.social.github}/repos`,
  );
  return data;
};

export const getReadme = async () => {
  try {
    const { data } = await axios.get(config.readmeUrl);
    return data;
  } catch (error) {
    return error;
  }
};

export const getWeather = async (city: string) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?qFAT`);
    return data;
  } catch (error) {
    return error;
  }
};

export const getQuote = async () => {
  try {
    const { data } = await axios.get('https://api.quotable.io/random');
    return {
      quote: `“${data.content}” — ${data.author}`,
    };
  } catch (error) {
    return error;
  }
};

/**
 * Get default theme from localStorage, window media or document body class.
 * @returns {boolean} false if light theme, true by default.
 */
export const defaultTheme = () => {
  const id = 'proxzimaDarkMode';
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem(id);
    if (storedPrefs === 'light') {
      return false;
    }

    const userMedia = window.matchMedia('(prefers-color-scheme: light)');
    if (!(id in localStorage) && userMedia.matches) {
      return false;
    }

    const docTheme =
      window.document.documentElement.classList.contains('light');
    if (!(id in localStorage) && docTheme) {
      return false;
    }
  }

  return true;
};
