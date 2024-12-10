import { setupFakeServer } from './servergen';

const fakeServer = setupFakeServer();

let fetchedUsers = false;
let usersRequest;
const userRequest = {};

export const mentions_fetch = (query, success) => {
  if (!fetchedUsers) {
    fetchedUsers = true;
    usersRequest = fakeServer.fetchUsers();
  }
  usersRequest.then((users) => {
    const userMatch = (name) => name.toLowerCase().includes(query.term.toLowerCase());
    success(users.filter((user) => userMatch(user.name) || userMatch(user.id)));
    fetchedUsers = false;
  });
};

export const mentions_menu_hover = (userInfo, success) => {
  if (!userRequest[userInfo.id]) {
    userRequest[userInfo.id] = fakeServer.fetchUser(userInfo.id);
  }
  userRequest[userInfo.id].then((userDetail) => {
    success({ type: 'profile', user: userDetail });
  });
};

export const mentions_menu_complete = (editor, userInfo) => {
  const span = editor.getDoc().createElement('span');
  span.className = 'mymention';
  span.setAttribute('style', 'color: #37F;');
  span.setAttribute('data-mention-id', userInfo.id);
  span.appendChild(editor.getDoc().createTextNode('@' + userInfo.name));
  return span;
};

export const mentions_select = (mention, success) => {
  const id = mention.getAttribute('data-mention-id');
  if (id) {
    userRequest[id] = fakeServer.fetchUser(id);
    userRequest[id].then((userDetail) => {
      success({ type: 'profile', user: userDetail });
    });
  }
};

export const tinycomments_can_resolve = (req, done, _fail) => {
    const allowed = req.comments.length > 0 && req.comments[0].author === currentAuthor;
    done({
      canResolve: allowed,
    });
  };
