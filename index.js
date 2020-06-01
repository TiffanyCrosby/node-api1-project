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
    id: shortid.generate(),
    name: 'Tiffany',
    bio: 'previous ER RN now a webdeveloper student',
  },
  {
    id: shortid.generate(),
    name: 'Corey',
    bio: 'mechanic. Amazingly fortunate to be the husband of Tiffany',
  },
  {
    id: shortid.generate(),
    name: 'Olivia',
    bio: 'oldest daughter of Corey and Tiffany. A twin.',
  },
  {
    id: shortid.generate(),
    name: 'Ava',
    bio: 'youngest daughter of Corey and Tiffany. A twin.',
  },
  {
    id: shortid.generate(),
    name: 'Antonio',
    bio: 'youngest child of Corey and Tiffany. Only boy.',
  },
];

server.get('/api/users', (req, res) => {
  users
    ? res.status(200).json(users)
    : res.status(500).json({
        errorMessage: 'The users information could not be retrieved.',
      });
});

server.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  user = users.filter((user) => user.id == { id });
  if (!user.id) {
    res.status(404).json({
      errorMessage: 'The user with the specified ID does not exist',
    });
  } else if (!user) {
    res
      .status(500)
      .json({ errorMessage: 'The user information could not be retrieved.' });
  } else {
    res.status(200).json(user);
  }
});

server.post('/api/users', (req, res) => {
  const user = req.body;
  users.push(user);
  if (!users) {
    res.status(500).json({
      errorMessage: 'There was an error while saving the user to the database',
    });
  } else if (!users.name && !users.bio) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide name and bio for the user.' });
  } else {
    res.status(201).json(users);
  }
});

server.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  users = users.filter((user) => {
    if (user.id == { id }) {
      res.status(404).json({
        errorMessage: 'The user with the specified ID does not exist.',
      });
    } else if (!user) {
      res.status(500).json({ errorMessage: 'The user could not be removed' });
    } else if (user.id !== { id }) {
      res.status(200).json(user);
    }
  });
});

server.put('/api/users/:id', (req, res) => {});
