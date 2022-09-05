import React, { useEffect, useCallback, useState } from 'react';
import './App.scss';
import { Cards } from './Components/Cards';
import { getPeople } from './api';
import { Nav } from './Components/Nav';


function App() {
  const [people, setPeople] = useState([]);
  const [queryPeople, setQueryPeople] = useState('');
  const [sliceFourPeopleFromArray, setSliceFourPeopleFromArrayt] = useState(0);
  const [sortedByName, setSortedByName] = useState(false);
  const [visiblePeople, setVisiblePeople] = useState([]);

  const debounce = (f, delay) => {
    let timerId;

    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(f, delay, ...args);
    };
  };

  useEffect(() => {
    getPeople().then(data => {
      setPeople([...data]);
      setVisiblePeople([...data]);
    });
  }, []);

  const getQueryPerson = useCallback(
    debounce(setQueryPeople, 1000),
    []
  );

  useEffect(() => {
    return (
      setSliceFourPeopleFromArrayt(0),
      sortedByName === true ?
        (setVisiblePeople([...people]
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(person => person.name
            .toLowerCase()
            .includes(queryPeople))))
        : (setVisiblePeople(people
          .filter(person => person.name
            .toLowerCase()
            .includes(queryPeople))))
    )
  }, [sortedByName, queryPeople]);

  const slicePeopleFromTableForView = (value) => {
    switch (value) {
      case 'next':
        return setSliceFourPeopleFromArrayt(prev => prev < visiblePeople.length - 4 ? prev += 4 : prev);
      case 'prev':
        return setSliceFourPeopleFromArrayt(prev => prev > 0 ? prev -= 4 : 0);

      default:
        return setSliceFourPeopleFromArrayt(sliceFourPeopleFromArray);
    }
  }

  return (
    <div className="App">
      <header className="App__header">
        <div className="App__logo">Lorem ipsum</div>
        <input
          type="text"
          placeholder='Search'
          className='App__search'
          onChange={(event) => getQueryPerson(event.target.value)}
        />
      </header>

      <Cards
        people={visiblePeople}
        sliceFourPeopleFromArray={sliceFourPeopleFromArray}
      />

      <Nav
        slicePeopleFromTableForView={slicePeopleFromTableForView}
        setSortedByName={setSortedByName}
        sortedByName={sortedByName}
      />

    </div>
  );
}

export default App;
