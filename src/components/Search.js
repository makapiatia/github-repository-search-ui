import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

library.add(faMagnifyingGlass);

function Search() {
  const [gitHubData, setGitHubData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [enterKeyPressed, setEnterKeyPressed] = useState(false);

  const sortDataByMostStars = (filteredRepos) => filteredRepos
    .sort((a, b) => parseFloat(b.stargazers_count) - parseFloat(a.stargazers_count));

  const fetchUserRepoData = (userName) => {
    axios.get(`https://api.github.com/users/${userName}/repos`)
      .then((response) => {
        setGitHubData(sortDataByMostStars(response.data));
        setEnterKeyPressed(false);
      }).catch((error) => {
        // eslint-disable-next-line no-console
        console.warn('No GitHub user with that username: ', error.toJSON());
      });
  };

  useEffect(() => {
    if (searchInput !== '') {
      fetchUserRepoData(searchInput);
    }
  }, [searchInput]);

  useEffect(() => {
    if (searchInput === '') {
      setFilteredResults([]);
      setEnterKeyPressed(false);
    }
  }, [searchInput]);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (enterKeyPressed) {
      if (searchInput === '') {
        setFilteredResults([]);
      } else {
        const filteredData = gitHubData.filter((item) => Object.values(item.owner.login).join('').toLowerCase().includes(searchInput.toLowerCase()));
        setFilteredResults(filteredData);
      }
    } else {
      setFilteredResults(gitHubData);
    }
  };

  const onEnterClicked = (event) => {
    if (event.key === 'Enter') {
      setEnterKeyPressed(true);
      searchItems(event.target.value);
    }
  };

  return (
    <div className="content">
      <div className="container">
        <section className="section">
          <div className="field">
            <p className="control has-icons-left">
              <input
                type="text"
                className="input is-info is-large is-rounded"
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyPress={(e) => onEnterClicked(e)}
                placeholder="Search by GitHub user..."
              />
              <span className="icon is-small is-left">
                <FontAwesomeIcon
                  icon="fas fa-magnifying-glass"
                />
              </span>
            </p>
          </div>
        </section>
        <section className="section">
          <div className="tile is-ancestor">
            <div className="tile is-parent">
              <div className="columns is-multiline is-centered is-mobile">
                {enterKeyPressed && searchInput !== ''
                  ? (
                    filteredResults.map((item) => (
                      <div key={item.id} className="column auto">
                        <div className="tile is-child">
                          <div className="card">
                            <div className="card-content">
                              <span className="tag is-primary is-light is-medium is-rounded">
                                <h2>{item.name}</h2>
                              </span>
                              <span className="tag is-white is-small">
                                <h5>
                                  {'owned by '}
                                  {item.owner.login}
                                </h5>
                              </span>
                              <div className="card-content">
                                <p>{item.description}</p>
                                <a href={item.homepage}>{item.homepage}</a>
                              </div>
                              <span className="tag is-primary is-rounded">
                                Stargazers Count
                                <div className="card-content">
                                  {item.stargazers_count}
                                </div>
                                <FontAwesomeIcon
                                  icon="fas fa-star"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )
                  : (
                    <div />
                  )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Search;
