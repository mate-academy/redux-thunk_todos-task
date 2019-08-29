const API_URL = 'https://jsonplaceholder.typicode.com';

export const getTodos = async() => {
  await wait(2000);
  const response = await fetch(`${API_URL}/todos`);

  return response.json();
};

export const getUser = async(userId) => {
  await wait(2000);
  const response = await fetch(`${API_URL}/users/${userId}`);

  return response.json();
};

const wait = delay => new Promise((resolve) => {
  setTimeout(resolve, delay);
});
