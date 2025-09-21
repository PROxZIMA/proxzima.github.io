// List of commands that do not require API calls

import config from '../../../config.json';
import Banner from '../../components/Banner';
import * as bin from './index';

// Help: Lists all commands
export const help = async (args: string[]): Promise<string> => {
  const commands = Object.keys(bin).sort();
  let c = '';
  for (let i = 1; i <= commands.length; i++) {
    if (i % 7 === 0) {
      c += commands[i - 1] + '\n';
    } else {
      c += commands[i - 1] + ' ';
    }
  }
  return `Welcome! Here are all the available commands:
\n${c}\n
[tab]          : trigger completion.
[ctrl+l]/clear : clear terminal.
[ctrl+c]       : cancel command.\n
Type 'sumfetch' to display summary.
`;
};

// Redirection
export const repo = async (args: string[]): Promise<string> => {
  window.open(`${config.repo}`);
  return 'Opening Github repository...';
};

export const resume = async (args: string[]): Promise<string> => {
  window.open(`${config.resume_url}`);
  return 'Opening resume...';
};

// Donate
export const donate = async (args: string[]): Promise<JSX.Element> => {
  return (
    <>
      {`Thank you for your interest.\nHere are the ways you can support my work:\n\n- `}
      <a
        className="text-light-blue dark:text-dark-blue underline"
        href={config.donate_urls['Buy Me a Coffee']}
        rel="noopener noreferrer"
        target="_blank"
      >
        Buy Me a Coffee?
      </a>
    </>
  );
};

// Contact
export const email = async (args: string[]): Promise<string> => {
  window.open(`mailto:${config.email}`);
  return `Opening E-mail client for ${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
  window.open(`https://github.com/${config.social.github}/`);
  return 'Opening github...';
};

export const linkedin = async (args: string[]): Promise<string> => {
  window.open(`https://www.linkedin.com/in/${config.social.linkedin}/`);
  return 'Opening linkedin...';
};

// Typical linux commands
export const echo = async (args: string[]): Promise<string> => {
  // https://regex101.com/r/qwEyED/1
  return args
    .join(' ')
    .replace(
      /<(?:(?:(?:(script|style|object|embed|applet|noframes|noscript|noembed)(?:\s+(?:"[\S\s]*?"|'[\S\s]*?'|(?:(?!\/>)[^>])?)+)?\s*>)[\S\s]*?<\/\1\s*(?=>))|(?:\/?[\w:]+\s*\/?)|(?:[\w:]+\s+(?:"[\S\s]*?"|'[\S\s]*?'|[^>]?)+\s*\/?)|\?[\S\s]*?\?|(?:!(?:(?:DOCTYPE[\S\s]*?)|(?:\[CDATA\[[\S\s]*?\]\])|(?:--[\S\s]*?--)|(?:ATTLIST[\S\s]*?)|(?:ENTITY[\S\s]*?)|(?:ELEMENT[\S\s]*?))))>/g,
      '',
    );
};

export const whoami = async (args: string[]): Promise<string> => {
  return `${config.ps1_username}`;
};

export const ls = async (args: string[]): Promise<string> => {
  return `a
bunch
of
fake
directories`;
};

export const cd = async (args: string[]): Promise<string> => {
  return `unfortunately, i cannot afford more directories.
if you want to help, you can type 'donate'.`;
};

export const date = async (args: string[]): Promise<string> => {
  return new Date().toString();
};

export const vi = async (args: string[]): Promise<string> => {
  return `woah, you still use 'vi'? just try 'vim'.`;
};

export const vim = async (args: string[]): Promise<string> => {
  return `'vim' is so outdated. how about 'nvim'?`;
};

export const nvim = async (args: string[]): Promise<string> => {
  return `'nvim'? too fancy. why not 'emacs'?`;
};

export const emacs = async (args?: string[]): Promise<string> => {
  return `you know what? just use vscode.`;
};

export const sudo = async (args?: string[]): Promise<string> => {
  window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ', '_blank'); // ...I'm sorry
  return `Permission denied: with little power comes... no responsibility? `;
};

export const history = async (args: string[]): Promise<string> => {
  if (args.length === 0) {
    return 'No commands in history.';
  }

  const maximumNumberOfDigits = args.length.toString().length;
  return args
    .map((value, i) => `${(i + 1).toString().padStart(maximumNumberOfDigits, ' ')}:  ${value}`)
    .reverse()
    .join('\n');
};

// Banner
export const banner = (args?: string[]): JSX.Element => {
  return <Banner />;
};
