class Animal {
  constructor(name, cost, wattsPerSecond, picture) {
    this.cost = cost;
    this.name = name;
    this.wattsPerSecond = wattsPerSecond;
    this.amount = 0;
    this.picture = picture;
  }

  calculateWatts() {
    return this.wattsPerSecond * this.amount;
  }
}

export default Animal;
