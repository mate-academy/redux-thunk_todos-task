const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTodos = async() => {
  await wait(2000);
  const response = await fetch(`${API_URL}/todos`);
  const todos = await response.json();

  // const getTodoByUserId = userId => todos.find(todo => todo.userId === userId)

  // return todos.filter(todo => todo === getTodoByUserId(todo.userId));
  return todos;
};

export const getUser = async(userId) => {
  await wait(2000);
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
};

const wait = delay => new Promise((resolve) => {
  setTimeout(resolve, delay);
});
