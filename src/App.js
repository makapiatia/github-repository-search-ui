import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

import Search from './components/Search';

library.add(faCodeBranch);

function App() {
  return (
    <div className="section is-large">
      <div className="container">
        <div className="columns is-centered">
          <div className="tags has-addons">
            <span className="tag is-info is-light is-rounded is-large">
              <h1 className="title is-2">GitHub Repository Search</h1>
            </span>
            <span className="tag is-info is-rounded is-large">
              <FontAwesomeIcon icon="fas fa-code-branch" />
            </span>
          </div>
        </div>
        <Search />
      </div>
    </div>
  );
}

export default App;
