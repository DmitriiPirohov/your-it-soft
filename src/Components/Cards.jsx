import classNames from 'classnames';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Post } from "./Post";

export const Cards = ({ people, searchPerson, sliceFourPeopleFromArray }) => {
  const [peopleIdForPost, setPeopleIdForPost] = useState(0);

  const getPersonId = (a) => {
    return setPeopleIdForPost(prev => prev === a ? 0 : a);
  };

  useEffect(() => {
    setPeopleIdForPost(0)
  }, [searchPerson, sliceFourPeopleFromArray, people]);

  return (
    <main
      className={classNames((peopleIdForPost > 0 ? 'App__body--width-post' : 'App__body'))}
    >
      <div className="container">
        {(people.length > 0 ? (
          Array.from(people)
            .slice(sliceFourPeopleFromArray, sliceFourPeopleFromArray + 4)
            .map(person => (
              <div
                className={classNames('App__card', (peopleIdForPost > 0) && ('App__card--width-post'))}
                key={person.id}
              >
                <div className='App__info'>{person.name}</div>
                <div className='App__info'>{person.email}</div>
                <div className='App__info'>{person.phone}</div>
                <div className='App__info'>{person.website}</div>
                <div
                  className={classNames('App__info--button',
                    (peopleIdForPost === person.id ? 'active-color' : '')
                  )}
                  onClick={() => getPersonId(person.id)}
                >
                  {peopleIdForPost !== person.id ? `Show Posts` : 'Hide Posts'}
                </div>
              </div>
            )
          )
        ) 
        : (
            <>
              User is not found
            </>
          )
        )}
      </div>
      
      {
        (peopleIdForPost > 0) &&
        <Post
          peopleIdForPost={peopleIdForPost}
          setPeopleIdForPost={setPeopleIdForPost}
        />
      }
    </main>
  );
}
