class PubSub {
  constructor() {
    this.subscribers = {};
  }

  subscribe(event, callback) {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }
    this.subscribers[event].push(callback);

    return () => this.unsubscribe(event, callback);
  }
  unsubscribe(event, callback) {
    if (!this.subscribers[event]) return;
    this.subscribers[event] = this.subscribers[event].filter(
      (cb) => cb !== callback
    );
  }
  publish(event, data) {
    if (!this.subscribers[event]) return;
    this.subscribers[event].forEach((callback) => {
      callback(data);
    });
  }
}

const pb = new PubSub();

const unsubscribeAirForce1 = pb.subscribe("air_force", (data) => {
  console.log("Subscriber 1 is airforce", data);
});

const unsubscribeAirForce2 = pb.subscribe("air_force", (data) => {
  console.log("Subscriber 2 is airforce", data);
});

const unsubscribeNewBalance1 = pb.subscribe("New_balance", (data) => {
  console.log("Subscriber 1 is New_balance", data);
});

pb.publish("air_force", { announcement: "availaible" });

unsubscribeAirForce1();

pb.publish("air_force", { announcement: "availaible" });
