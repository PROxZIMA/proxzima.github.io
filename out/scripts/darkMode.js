document.documentElement.classList.toggle(
  'dark',
  localStorage.getItem('proxzimaDarkMode') === 'dark' ||
  (!('proxzimaDarkMode' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches),
);
