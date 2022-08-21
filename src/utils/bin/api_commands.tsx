// List of commands that require API calls

import RepoCard from '../../components/RepoCard';
import {
  defaultTheme,
  getProjects,
  getQuote,
  getReadme,
  getWeather
} from '../api';

import GitHubCalendar from 'react-github-calendar';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  dracula,
  oneLight
} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

import config from '../../../config.json';

export const projects = async (args: string[]): Promise<JSX.Element> => {
  const projects = (await getProjects()).sort(
    (a, b) =>
      b.stargazers_count - a.stargazers_count ||
      b.topics.length - a.topics.length,
  );

  return (
    <div className="grid mx-0 my-6 gap-6 grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))]">
      {projects.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export const quote = async (args: string[]): Promise<string> => {
  const data = await getQuote();
  return data.quote;
};

export const about = async (args: string[]): Promise<JSX.Element> => {
  const theme = defaultTheme();
  const calendarTheme = theme
    ? {
        level0: '#252733',
        level1: '#0e4429',
        level2: '#006d32',
        level3: '#26a641',
        level4: '#39d353',
      }
    : {
        level0: '#ebedf0',
        level1: '#9be9a8',
        level2: '#40c463',
        level3: '#30a14e',
        level4: '#216e39',
      };

  const codeTheme = theme ? dracula : oneLight;

  const readme = await getReadme();

  return (
    <>
      {`Opening GitHub README...\n\n`}
      <ReactMarkdown
        skipHtml={false}
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={codeTheme}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children)}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {`<div class="max-w-[1100px]">${readme}</div>`}
      </ReactMarkdown>

      <div className="flex items-center justify-center max-w-[1100px]">
        <GitHubCalendar
          username={config.social.github}
          theme={calendarTheme}
          hideColorLegend
          hideMonthLabels
        />
      </div>

      {`\n\nMore about me:\n'sumfetch'\t-\tShort summary.\n'resume'\t-\tMy latest resume.\n'projects'\t-\tList of my projects.`}
    </>
  );
};

export const weather = async (args: string[]): Promise<string> => {
  const city = args.join('+');
  if (!city) {
    return 'Usage: weather [city]. Example: weather Pune';
  }
  const weather = await getWeather(city);
  return weather;
};
