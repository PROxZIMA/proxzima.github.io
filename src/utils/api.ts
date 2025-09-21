import axios from 'axios';
import config from '../../config.json';

export const getProjects = async () => {
  try {
    const { data } = await axios.get(
      `https://api.github.com/users/${config.social.github}/repos`,
    );
    return data;
  } catch (error) {
    return 'Unable to query Github at the moment. Please try again later.';
  }
};

export const getReadme = async () => {
  try {
    const { data } = await axios.get(config.readmeUrl);
    return data;
  } catch (error) {
    return 'Unable to fetch README at the moment. Please try again later.';
  }
};

export const getWeather = async (city: string) => {
  try {
    const { data } = await axios.get(`https://wttr.in/${city}?qFAT`);
    return data;
  } catch (error) {
    return 'Unable to fetch weather data at the moment. Please try again later.';
  }
};

export const getQuote = async () => {
  try {
    const { data } = await axios.get('http://api.quotable.io/random');
    return {
      quote: `“${data.content}” — ${data.author}`,
    };
  } catch (error) {
    return {
      quote: 'Unable to fetch a quote at the moment. Please try again later.',
    };
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
