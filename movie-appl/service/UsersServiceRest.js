const POLLING_INTERVAL = 60000;

export default class UserServiceRest {
  #handlerFn;
  #URL;
  #usersCash;
  #intervalId;
  #isLogedIn;
  
  constructor(baseURL, handlerFn, isLogedIn) {
    this.#URL = baseURL;
    this.#handlerFn = handlerFn;
    this.isLogedIn = isLogedIn;
    this.#intervalId = null;
    if (this.#isLogedIn) {
      this.startPoller();
    }
  }

  async startPoller() {
    if (!this.#intervalId) {
      this.#intervalId = setInterval(this.#poller.bind(this), POLLING_INTERVAL);
    }
  }

  async stopPoller() {
    if (this.#intervalId) {
      clearInterval(this.#intervalId);
      this.#intervalId = null;
    }
  }

  async #poller() {
      setInterval(async () => {
          const users = await this.getAllUsers();
          if (!this.#usersCash || JSON.stringify(this.#usersCash) !== JSON.stringify(users)) {
            this.#usersCash = users;
            this.#handlerFn(this.#usersCash);}
      }, POLLING_INTERVAL);
    }

  async registration(newUser) {
    const existingUser = await this.findUserByName(newUser.userName);
    if (existingUser) {
      alert("There already exist User with this userName");
      return false;
    }
    const response = await fetch(this.#URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    });
    const registeredUser = await response.json();
    return registeredUser;
  }

  async logIn(user) {
    let res = await this.findUserByName(user.userName);
    if (res) {
      if (res.password != user.password) {
        alert("UserName and Password don't match");
        res = false;
      }
    } else {
      alert("There is no Users with this userName");
      res = false;
    }
    return res ? res : res;
  }

  async findUserByName(userName) {
    const users = await this.getAllUsers();
    const foundUsers = users.filter((g) => g.userName == userName);
    return foundUsers.length != 0 ? foundUsers[0] : false;
  }

  async getAllUsers() {
    const response = await fetch(this.#URL);
    return response.json();
  }

  async getUserById(id, key) {
    const thisURL = key ? `${this.#URL}/${id}`.concat(key) : `${this.#URL}/${id}`;
    const response = await fetch(thisURL);
    return await response.json();
  }

  async updateUser(userId, newValue) {   
    const objectURL = `${this.#URL}/${userId}`;
    const response = await fetch(objectURL, {
      method: 'PUT',
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify(newValue)
    });
    return response.json();
  }
}