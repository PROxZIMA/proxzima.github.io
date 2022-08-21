import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import style from '../styles/404.module.css';

const NotFoundPage = () => {
  // prettier-ignore
  const errorAscii = [
    "                                                                                                ,---,  ",
    "                                   ,----..                     ,--,                      ,--,,`--.' |  ",
    "    ,---,.,-.----.   ,-.----.     /   /   \\  ,-.----.        ,--.'|    ,----..         ,--.'||   :  :  ",
    "  ,'  .' |\\    /  \\  \\    /  \\   /   .     : \\    /  \\    ,--,  | :   /   /   \\     ,--,  | :'   '  ;  ",
    ",---.'   |;   :    \\ ;   :    \\ .   /   ;.  \\;   :    \\,---.'|  : '  /   .     : ,---.'|  : '|   |  |  ",
    "|   |   .'|   | .\\ : |   | .\\ :.   ;   /  ` ;|   | .\\ :;   : |  | ; .   /   ;.  \\;   : |  | ;'   :  ;  ",
    ":   :  |-,.   : |: | .   : |: |;   |  ; \\ ; |.   : |: ||   | : _' |.   ;   /  ` ;|   | : _' ||   |  '  ",
    ":   |  ;/||   |  \\ : |   |  \\ :|   :  | ; | '|   |  \\ ::   : |.'  |;   |  ; \\ ; |:   : |.'  |'   :  |  ",
    "|   :   .'|   : .  / |   : .  /.   |  ' ' ' :|   : .  /|   ' '  ; :|   :  | ; | '|   ' '  ; :;   |  ;  ",
    "|   |  |-,;   | |  \\ ;   | |  \\'   ;  \\; /  |;   | |  \\\\   \\  .'. |.   |  ' ' ' :\\   \\  .'. |`---'. |  ",
    "'   :  ;/||   | ;\\  \\|   | ;\\  \\\\   \\  ',  / |   | ;\\  \\`---`:  | ''   ;  \\; /  | `---`:  | ' `--..`;  ",
    "|   |    \\:   ' | \\.':   ' | \\.' ;   :    /  :   ' | \\.'     '  ; | \\   \\  ',  /       '  ; |.--,_     ",
    "|   :   .':   : :-'  :   : :-'    \\   \\ .'   :   : :-'       |  : ;  ;   :    /        |  : ;|    |`.  ",
    "|   | ,'  |   |.'    |   |.'       `---`     |   |.'         '  ,/    \\   \\ .'         '  ,/ `-- -`, ; ",
    "`----'    `---'      `---'                   `---'           '--'      `---`           '--'    '---`\"  ",
    "                                                                                                       "
  ]

  const router = useRouter();
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const lastOpRef = useRef(null);

  const [input, setInput] = useState('');
  const [history, setHistory] = React.useState<Array<JSX.Element>>([
    <p key={0} className={style.prompt}>
      {`The page you are looking for might have been removed\n  or is temporarily unavailable. Try typing 'error'.`}
    </p>,
    <p key={1} className={style.prompt}>
      Please try to <span onClick={() => router.back()}>go back</span> or{' '}
      <span onClick={() => router.replace('/')}>return to the homepage</span>.
    </p>,
  ]);

  const textEffect = (line) => {
    let alpha = [';', '.', ',', ':', ';', '~', '`'],
      index = 0,
      string = line.innerHTML;
    let splitString = string.split('');
    let copyString = splitString.slice(0);
    let emptyString = copyString.map(() => [
      alpha[Math.floor(Math.random() * alpha.length)],
      index++,
    ]);
    emptyString = shuffle(emptyString);
    emptyString.forEach((char, i) => {
      toUnderscore(copyString, line, char);
      setTimeout(function () {
        fromUnderscore(copyString, splitString, char, line);
      }, i * 10);
    });
  };

  const toUnderscore = (copyString, line, newChar) => {
    copyString[newChar[1]] = newChar[0];
    line.innerHTML = copyString.join('');
  };

  const fromUnderscore = (copyString, splitString, newChar, line) => {
    copyString[newChar[1]] = splitString[newChar[1]];
    line.innerHTML = copyString.join('');
  };

  const shuffle = (o) => {
    for (
      let j, x, i = o.length;
      i;
      j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  };

  const resetForm = () => {
    setHistory([
      ...history,
      <p key={history.length} className={style.prompt}>
        {input}
      </p>,
      <p key={history.length + 1} className={style.prompt}>
        Sorry that command is not recognized.
      </p>,
    ]);
    setInput('');
  };

  const showError = async () => {
    await setHistory([
      ...history,
      <p key={history.length} className={style.prompt}>
        {input}
      </p>,
      <div
        ref={lastOpRef}
        key={history.length + 1}
        className={style.error_ascii}
      >
        {errorAscii.map((error, i) => (
          <p key={i} className={style.prompt}>
            {error}
          </p>
        ))}
      </div>,
    ]);

    let lines = [...lastOpRef.current.childNodes].slice(-errorAscii.length);
    lines.forEach((line, index) => {
      setTimeout(function () {
        line.style.opacity = 1;
        textEffect(line);
      }, index * 100);
    });
    setInput('');
  };

  const onChange = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setInput(value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (input.trim().toLocaleLowerCase() === 'error') {
      showError();
    } else {
      resetForm();
    }
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus({ preventScroll: true });
    }
  }, []);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      inputRef.current.focus({ preventScroll: true });
    }
  }, [history]);

  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>

      <div
        className="overflow-hidden h-full"
        onClick={() => inputRef.current.focus({ preventScroll: true })}
      >
        <div className="overflow-y-auto h-full">
          <form className={style.four_oh_four_form} onSubmit={onSubmit}>
            <input
              type={style.text}
              className={style.input_404}
              ref={inputRef}
              onChange={onChange}
              value={input}
            />
          </form>

          <div className={style.terminal}>
            <h1
              className={`${style.error} text-light-green/[.8] dark:text-dark-green/[.8]`}
            >
              Error <span className={style.errorcode}>404</span>
            </h1>
            {history}
            <p
              className={`${style.prompt} ${style.output} ${style.new_output}`}
              ref={outputRef}
            >
              {input}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
