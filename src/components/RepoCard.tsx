import ForkIcon from '../components/icons/ForkIcon';
import GithubIcon from '../components/icons/GithubIcon';
import LinkIcon from '../components/icons/LinkIcon';
import StarIcon from '../components/icons/StarIcon';
import WatchIcon from '../components/icons/WatchIcon';
import styles from '../styles/RepoCard.module.css';

const RepoCard = ({ repo }) => {
  return (
    <div className={`${styles.card} bg-light-card dark:bg-dark-card`}>
      <div>
        <h3 className={styles.title}>{repo.name}</h3>
        <p>{repo.description}</p>
      </div>
      <div>
        <div className={styles.topics}>
          {repo.topics.map((topic) => (
            <span
              key={topic}
              className="border-solid border-[0.1rem] border-light-gray/[.5] dark:border-dark-gray/[.5] hover:bg-light-gray/[.2] dark:hover:bg-dark-gray/[.2]"
            >
              {topic}
            </span>
          ))}
        </div>
        <div className={styles.stats}>
          <div>
            <div>
              <WatchIcon className={styles.icon} /> {repo.watchers}
            </div>
            <div>
              <ForkIcon className={styles.icon} /> {repo.forks}
            </div>
            <div>
              <StarIcon className={styles.icon} /> {repo.stargazers_count}
            </div>
          </div>
          <div>
            <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
              <GithubIcon height={20} width={20} className={styles.icon} />
            </a>
            {repo.homepage && (
              <a href={repo.homepage} target="_blank" rel="noopener noreferrer">
                <LinkIcon height={20} width={20} className={styles.icon} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;
