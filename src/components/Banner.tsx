import { useEffect, useState } from 'react';
import config from '../../config.json';
import packageJson from '../../package.json';
import style from '../styles/Banner.module.css';

const Banner = () => {
  const [isAnimated1, setIsAnimated1] = useState(true);
  const [isAnimated2, setIsAnimated2] = useState(false);
  const [isAnimated3, setIsAnimated3] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAnimated2(!isAnimated2); // Set
      setTimeout(() => {
        setIsAnimated1(!isAnimated1);
      }, 2000); // Remove (2000 + 2000 = 4 sec animation)
      setTimeout(() => {
        setIsAnimated3(!isAnimated3); // Set
        setTimeout(() => {
          setIsAnimated2(!isAnimated2);
        }, 2000); // Remove
        setTimeout(() => {
          setIsAnimated1(!isAnimated1); // Set
          setTimeout(() => {
            setIsAnimated3(!isAnimated3);
          }, 2000); // Remove
        }, 1000);
      }, 2000);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [isAnimated1, isAnimated2, isAnimated3]);

  const commonClasses = 'inline-block subpixel-antialiased';
  const commonBigTextClasses = 'text-4xl md:text-6xl lg:text-7xl';
  const tailwindClassName = `text-[.65rem] md:text-base lg:text-xl !leading-tight min-w-max ${commonClasses} ${
    isAnimated1 && style.name_gradient
  }`;
  const tailwindClassWeb = `${commonBigTextClasses} ${commonClasses} ${
    isAnimated2 && style.first_word_gradient
  }`;
  const tailwindClassDeveloper = `${commonBigTextClasses} ${commonClasses} ${
    isAnimated3 && style.second_word_gradient
  }`;

  return (
    <>
      <h1 className="mb-2 font-bold font-poppins select-none">
        <span className={tailwindClassName}>
          {`
██████╗ ██████╗  ██████╗ ██╗  ██╗███████╗ ██╗███╗   ███╗ █████╗
██╔══██╗██╔══██╗██╔═████╗╚██╗██╔╝╚══███╔╝███║████╗ ████║██╔══██╗
██████╔╝██████╔╝██║██╔██║ ╚███╔╝   ███╔╝ ╚██║██╔████╔██║███████║
██╔═══╝ ██╔══██╗████╔╝██║ ██╔██╗  ███╔╝   ██║██║╚██╔╝██║██╔══██║
██║     ██║  ██║╚██████╔╝██╔╝ ██╗███████╗ ██║██║ ╚═╝ ██║██║  ██║
╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚══════╝ ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ v${packageJson.version}`}
        </span>
        <br />
        <span className={tailwindClassWeb}>Web</span>
        <br />
        <span className={tailwindClassDeveloper}>Developer</span>
      </h1>
      <p className="my-5 md:my-10 text-neutral w-[60ch]">
        {`I seek problems to solve them. Love to learn whatever that will make the future. Very versatile and adapt quickly to a changing environment. Passionate, highly skilled in Front-End Web Development alongside modern frameworks like React/Django and other libraries. Open Source contributor.`}
      </p>
      <p>
        {`Type 'help' to see the list of available commands.\nType 'about' to see my GitHub Readme.\nType 'sumfetch' to display summary.\nType 'repo' or click `}
        <u>
          <a
            className="text-light-blue dark:text-dark-blue underline"
            href={config.repo}
            rel="noopener noreferrer"
            target="_blank"
          >
            here
          </a>
        </u>
        {` for the Github repository.`}
      </p>
    </>
  );
};

export default Banner;
