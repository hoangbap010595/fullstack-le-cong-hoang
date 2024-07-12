import express from "express";
import { Todo } from "../database";
import { Op } from "sequelize";

const registerTodoApi = (app: express.Express) => {
  /**
   * @openapi
   * /todos?text=&completed=:
   *   get:
   *     summary: List resources with basic filters.
   *     parameters:
   *       - in: query
   *         name: text
   *         schema:
   *           type: string
   *         description: Name or Description.
   *       - in: query
   *         name: completed
   *         schema:
   *           type: boolean
   *         description: Task completed.
   *     responses:
   *       200:
   *         description: Returns a list of todos.
   */
  app.get("/todos", async (req: express.Request, res: express.Response) => {
    const { text, completed } = req.query;

    const query: any = {};
    if (text) {
      query[Op.or] = [
        { name: { [Op.like]: `%${text}%` } },
        { description: { [Op.like]: `%${text}%` } },
      ];
    }
    if (completed) {
      query.completed = completed === "true";
    }

    const todos = await Todo.findAll({ where: query });

    res.json(todos);
  });

  /**
   * @openapi
   * /todos/{id}:
   *   get:
   *     summary: Get details of a resource.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The unique identifier of the todo item.
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: Returns the details of the requested todo item.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Todo'
   */
  app.get("/todos/:id", async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const todo = await Todo.findOne({ where: { id } });
    res.json(todo);
  });

  /**
   * @openapi
   * /todos:
   *   post:
   *     summary: Create a resource.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateTodoRequest'
   *     responses:
   *       200:
   *         description: Returns the details of the requested todo item.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Todo'
   */
  app.post("/todos", async (req: express.Request, res: express.Response) => {
    const { name, description } = req.body;
    const todo = await Todo.create({
      name,
      description,
      completed: false,
      createdAt: new Date(),
    });
    res.json(todo);
  });

  /**
   * @openapi
   * /todos/{id}:
   *   put:
   *     summary: Update resource details.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The unique identifier of the todo item.
   *         schema:
   *           type: integer
   *           example: 1
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/UpdateTodoRequest'
   *     responses:
   *       200:
   *         description: Returns the details of the requested todo item.
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Todo'
   */
  app.put("/todos/:id", async (req: express.Request, res: express.Response) => {
    const { id } = req.params;
    const { name, description, completed } = req.body;
    const todo = await Todo.update(
      { name, description, completed, updatedAt: new Date() },
      { where: { id } }
    );
    res.json(todo);
  });

  /**
   * @openapi
   * /todos/{id}:
   *   delete:
   *     summary: Delete a resource.
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         description: The unique identifier of the todo item.
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: Returns 0 or 1.
   */
  app.delete(
    "/todos/:id",
    async (req: express.Request, res: express.Response) => {
      const { id } = req.params;
      const todo = await Todo.destroy({ where: { id } });
      res.json(todo);
    }
  );
};

export default registerTodoApi;
