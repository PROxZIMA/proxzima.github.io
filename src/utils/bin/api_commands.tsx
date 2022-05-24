// List of commands that require API calls

import { getProjects } from '../api';
import { getQuote } from '../api';
import { getReadme } from '../api';
import { getWeather } from '../api';
import { theme } from '../api';

import ReactDOMServer from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { oneLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export const projects = async (args: string[]): Promise<string> => {
  const projects = await getProjects();
  return (
    '<table>' +
    projects
      .map(
        (repo) =>
          `<tr><td>${repo.name}</td><td>⠀-⠀</td><td><a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a></td></tr><tr><td colspan="2"></td><td>${repo.description}</td></tr>`,
      )
      .join('\n') +
    '</table>'
  );
};

export const quote = async (args: string[]): Promise<string> => {
  const data = await getQuote();
  return data.quote;
};

export const about = async (args: string[]): Promise<string> => {
  const readme = await getReadme();
  return `Opening GitHub README...\n
  ${ReactDOMServer.renderToStaticMarkup(
    <ReactMarkdown
      children={readme}
      skipHtml={false}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={theme() ? dracula : oneLight}
              language={match[1]}
              PreTag="div"
              {...props}
            />
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    />,
  )}
  More about me:
  'sumfetch' - Short summary.
  'resume'   - My latest resume.
  'projects' - List of my projects.`;
};

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');
  if (!city) {
    return 'Usage: weather [city]. Example: weather Pune';
  }
  const weather = await getWeather(city);
  return weather;
};
