const People_URL = 'https://jsonplaceholder.typicode.com/users';
const Post_URL = 'https://jsonplaceholder.typicode.com/posts';

export function getPeople() {
  return (
    fetch(People_URL)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(
            `${response.status} - ${response.statusText}`
          );
        }

        return response.json();
      })
  );
}

export function getPosts() {
  return (
    fetch(Post_URL)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(
            `${response.status} - ${response.statusText}`
          );
        }

        return response.json();
      })
  );
}
