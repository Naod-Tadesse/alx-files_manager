import { promisify } from "util";
import { createClient } from "redis";

/**
 * redis
 */
class RedisClient {
  /**
   * class def
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on("error", (err) => {
      console.error(
        "Redis client failed to connect:",
        err.message || err.toString()
      );
      this.isClientConnected = false;
    });
    this.client.on("connect", () => {
      this.isClientConnected = true;
    });
  }

  /**
   * alive?
   * @returns {boolean}
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * retrieve value using ke
   * @param {String} key key of the item to retrieve.
   * @returns {String | Object}
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * ke storage
   * @param {String} key item tot store
   * @param {String | Number | Boolean} value
   * @param {Number} duration
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  /**
   * remove value from array
   * @param {String} key Tthe key
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
