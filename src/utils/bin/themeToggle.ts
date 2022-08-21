import { defaultTheme } from '../api';

const toggle = async (args: string[]): Promise<string> => {
  let newTheme;

  if (args.length > 0 && (args[0] === 'light' || args[0] === 'dark')) {
    newTheme = args[0];
  } else {
    newTheme = defaultTheme() ? 'light' : 'dark';
  }

  window.document.documentElement.classList.toggle('dark', newTheme === 'dark');

  localStorage.setItem('proxzimaDarkMode', newTheme);

  return `Switched to ${newTheme} theme...`;
};

export default toggle;
