import { faker } from '@faker-js/faker';

export const adminUser = {
  id: 'mrinasugosh',
  name: 'Mrina Sugosh',
  fullName: 'Mrina Sugosh',
  description: 'Author',
  image: "https://media.licdn.com/dms/image/v2/D4E03AQEhPAHygiq6jA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727801161661?e=1739404800&v=beta&t=CR-Mz9Iwu2bL8GKeQ0EhsQm8OsMGUko3pZvVaZz-Gik"
};

export const currentUser = {
  id: 'jennynichols',
  name: 'Jenny Nichols',
  fullName: 'Jenny Nichols',
  description: 'Marketing Director',
  image: "https://i.pravatar.cc/150?img=10"
};

const fakeDelay = 500;
const numberOfUsers = 200;

export const setupFakeServer = () => {
  const images = [adminUser.image, currentUser.image];
  const userNames = [adminUser.fullName, currentUser.fullName];

  for (let i = 0; i < numberOfUsers; i++) {
    images.push(faker.image.avatar());
    userNames.push(`${faker.person.firstName()} ${faker.person.lastName()}`);
  }

  const userDb = {
    [adminUser.id]: adminUser,
    [currentUser.id]: currentUser,
  };

  userNames.forEach((fullName) => {
    if (![currentUser.fullName, adminUser.fullName].includes(fullName)) {
      const id = fullName.toLowerCase().replace(/ /g, '');
      userDb[id] = {
        id,
        name: fullName,
        fullName,
        description: faker.person.jobTitle(),
        image: images[Math.floor(images.length * Math.random())],
      };
    }
  });

  const fetchUsers = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        const users = Object.values(userDb).map(({ id, name, image, description }) => ({
          id,
          name,
          image,
          description,
        }));
        resolve(users);
      }, fakeDelay);
    });

  const fetchUser = (id) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (userDb[id]) resolve(userDb[id]);
        else reject(`unknown user id "${id}"`);
      }, fakeDelay);
    });

  return { fetchUsers, fetchUser };
};
