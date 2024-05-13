const users = [
  { firstname: "Noah", lastname: "Smith", score: 32 },
  { firstname: "Liam", lastname: "Harris", score: 90 },
  { firstname: "Emma", lastname: "Harris", score: 85 },
  { firstname: "William", lastname: "Jackson", score: 44 },
  { firstname: "Mason", lastname: "White", score: 95 },
  { firstname: "James", lastname: "Taylor", score: 70 },
  { firstname: "Benjamin", lastname: "Clark", score: 75 },
  { firstname: "Olivia", lastname: "Clark", score: 39 },
  { firstname: "Ava", lastname: "White", score: 56 },
  { firstname: "Sophia", lastname: "Walker", score: 69 },
  { firstname: "Isabella", lastname: "Brooks", score: 80 },
  { firstname: "Mia", lastname: "Sanchez", score: 80 },
  { firstname: "Jacob", lastname: "Anderson", score: 76 },
  { firstname: "Charlotte", lastname: "Rodriguez", score: 96 },
  { firstname: "Abigail", lastname: "Adams", score: 54 },
  { firstname: "Emily", lastname: "Adams", score: 33 },
  { firstname: "Michael", lastname: "Gonzalez", score: 68 },
  { firstname: "Calvin", lastname: "Carter", score: 87 },
  { firstname: "Stella", lastname: "Carter", score: 48 },
  { firstname: "Sam", lastname: "Turner", score: 82 },
];

function fetchUsers() {
  return new Promise(resolve => {
    setTimeout(() => {
      const randomUsers = [];
      const randomIndexes = [];
      while (randomIndexes.length < 10) {
        const index = Math.floor(Math.random() * users.length);
        if (!randomIndexes.includes(index)) {
          randomIndexes.push(index);
          randomUsers.push(users[index]);
        }
      }
      const totalScore = randomUsers.reduce((acc, user) => acc + user.score, 0);
      resolve(randomUsers, totalScore);
    }, 1000);
  });
}

function getNewUsers() {
  return users.slice(0, 5);
}

export { fetchUsers, getNewUsers }