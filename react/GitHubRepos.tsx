import React, { FC, useEffect, useState } from 'react';
import styles from './GitHubRepos.css';

interface Props {}

interface GitHubUser {
  login: string;
  avatar_url: string;
}

interface GitHubRepo {
  id: number;
  name: string;
  url: string;
  owner: GitHubUser;
}

const GitHubRepos = ({}: Props) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<GitHubRepo[]>([]);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    fetch('/_v/github-app/v0/username')
      .then((res) => res.json())
      .then((res) => {
        setUserName(res.userName);
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="w-80-ns w-90 mv-2 db center mt7 mw9">
      <h2 className="tc">Title</h2>
      <div className={`db flex-ns ` + `${styles.tweetsContainer}`}>
        <div className={`dn flex-ns ` + `${styles.locationContainer}`}>
          <p className={`tc f1 ` + `${styles.location}`}>"{userName}"</p>
        </div>
        <div className={`db dn-m ` + `${styles.locationContainerMobile}`}>
          <p className={`tc f2 ` + `${styles.location}`}>"{userName}"</p>
        </div>
        <ul className={`${styles.tweets}`}>
          {data.map((item: GitHubRepo, index: number) => (
            <li key={index}>
              <a href={item.url} className={`${styles.userName}`}>
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GitHubRepos;
