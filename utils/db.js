import mongodb from "mongodb";
// eslint-disable-next-line no-unused-vars
import Collection from "mongodb/lib/collection";
import envLoader from "./env_loader";

/**
 * mongo
 */
class DBClient {
  /**
   * new instance
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || "localhost";
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || "files_manager";
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * check if connected
   * @returns {boolean}
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * retieve no of users
   * @returns {Promise<Number>}
   */
  async nbUsers() {
    return this.client.db().collection("users").countDocuments();
  }

  /**
   * retieve no of files
   * @returns {Promise<Number>}
   */
  async nbFiles() {
    return this.client.db().collection("files").countDocuments();
  }

  /**
   * Rretrieve no of user
   * @returns {Promise<Collection>}
   */
  async usersCollection() {
    return this.client.db().collection("users");
  }

  /**
   * collection reference
   * @returns {Promise<Collection>}
   */
  async filesCollection() {
    return this.client.db().collection("files");
  }
}

export const dbClient = new DBClient();
export default dbClient;
