import { FastifyInstance } from "fastify";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "devsupersecret";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/login", async (request, reply) => {
    const { email, password } = request.body as {
      email: string;
      password: string;
    };

    // Dummy authentication logic
    if (email === "admin@example.com" && password === "password") {
      const token = jwt.sign({ email }, SECRET, { expiresIn: "1h" });
      return reply.send({ token });
    }

    return reply.status(401).send({ error: "Invalid credentials" });
  });

  app.get("/me", async (request, reply) => {
    try {
      const authHeader = request.headers.authorization;
      if (!authHeader) {
        return reply.status(401).send({ error: "Missing token" });
      }

      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, SECRET);
      return reply.send({ user: decoded });
    } catch (err) {
      return reply.status(401).send({ error: "Invalid token" });
    }
  });
}
