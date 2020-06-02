const express = require('express');
let shortid = require('shortid');

const server = express();
server.use(express.json());

const port = 8000;

server.listen(port, () => {
  console.log(`\n == Server listening to API from port: ${port} == \n`);
});

let users = [
  {
    id: 1,
    name: 'Tiffany',
    bio: 'previous ER RN now a webdeveloper student',
  },
  {
    id: 2,
    name: 'Corey',
    bio: 'mechanic. Amazingly fortunate to be the husband of Tiffany',
  },
  {
    id: 3,
    name: 'Olivia',
    bio: 'oldest daughter of Corey and Tiffany. A twin.',
  },
  {
    id: 4,
    name: 'Ava',
    bio: 'youngest daughter of Corey and Tiffany. A twin.',
  },
  {
    id: 5,
    name: 'Antonio',
    bio: 'youngest child of Corey and Tiffany. Only boy.',
  },
];

server.get('/', (req, res) => {
  res.json({ message: 'Hello, from index.js' });
});

server.get('/api/users', (req, res) => {
  users
    ? res.status(200).json(users)
    : res.status(500).json({
        errorMessage: 'The users information could not be retrieved.',
      });
});

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  let user = users.find((user) => user.id == id);

  if (user) {
    res.status(200).json(user);
  } else if (!users) {
    res
      .status(500)
      .json({ errorMessage: 'The users information could not be retrieved.' });
  } else {
    res.status(404).json({
      errorMessage: 'The user with the specified ID does not exist',
    });
  }
});

server.post('/api/users', (req, res) => {
  const user = req.body;

  if (user) {
    users.push(user);
    res.status(201).json(users);
  } else if (user !== (user.name && user.bio)) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else if (users.includes(user) == false) {
    res.status(500).json({
      errorMessage: 'There was an error while saving the user to the database',
    });
  }
});

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  let found = users.find((user) => user.id === id);
  if (!found) {
    res.status(404).json({
      errorMessage: 'The user with the specified ID does not exist.',
    });
  } else if (found) {
    res.status(500).json({ errorMessage: 'The user could not be removed' });
  } else {
    res.status(200).json(users);
  }
});

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const user = req.body;

  let found = users.find((user) => user.id == id);

  if (found) {
    Object.assign(found, user);
    res.status(200).json(users);
  } else if (!found) {
    res
      .status(404)
      .json({ errorMessage: 'The user with the specified ID does not exist.' });
  } else if (user !== (user.name && user.bio)) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else if (
    users.includes((user) => {
      user.name === user.name, user.bio === user.bio;
    })
  ) {
    res.status(500).json({
      errorMessage: 'The user information could not be modified.',
    });
  }
});
