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

export const theme = () =>
  localStorage.getItem('proxzimaDarkMode') === 'dark' ||
  (!('proxzimaDarkMode' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches) ||
  (!('proxzimaDarkMode' in localStorage) &&
    window.document.documentElement.classList.contains('dark'));
