import { theme } from "../api";


const toogle = async (args: string[]): Promise<string> => {
  let newTheme = theme() ? 'light' : 'dark';

  if (newTheme === 'dark') {
    window.document.documentElement.classList.add('dark')
  } else {
    window.document.documentElement.classList.remove('dark')
  }

  localStorage.setItem('proxzimaDarkMode', newTheme);

  return `Switched to ${newTheme} theme...`;
}

export default toogle;