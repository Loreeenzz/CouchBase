import { Cluster, Collection } from "couchbase";

// Couchbase connection configuration
const cluster = new Cluster("couchbase://localhost", {
  username: "Administrator",
  password: "password",
});

// Connect to the bucket and collection
const bucket = cluster.bucket("default");
const collection = bucket.defaultCollection();

export async function connectToDatabase() {
  try {
    // Test the connection
    await collection.get("test");
    return { collection };
  } catch (error) {
    console.error("Error connecting to Couchbase:", error);
    throw new Error("Failed to connect to database");
  }
}
