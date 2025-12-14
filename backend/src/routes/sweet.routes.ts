import { Router } from "express";
import { AppDataSource } from "../../ormconfig";
import { Sweet } from "../entity/Sweet";
import { authenticateToken, requireAdmin, AuthRequest } from "../middleware/auth";
import { body, validationResult } from "express-validator";

const router = Router();
const sweetRepo = () => AppDataSource.getRepository(Sweet);

/**
 * All /api/sweets endpoints require authentication
 */
router.use(authenticateToken);

// GET /api/sweets - list all sweets
router.get("/", async (req, res) => {
  const sweets = await sweetRepo().find();
  res.json(sweets);
});

// GET /api/sweets/search?name=&category=&minPrice=&maxPrice=
router.get("/search", async (req, res) => {
  const { name, category, minPrice, maxPrice } = req.query;
  const qb = sweetRepo().createQueryBuilder("sweet");

  if (name) qb.andWhere("LOWER(sweet.name) LIKE LOWER(:name)", { name: `%${String(name)}%` });
  if (category) qb.andWhere("LOWER(sweet.category) = LOWER(:category)", { category: String(category) });
  if (minPrice) qb.andWhere("sweet.price >= :minPrice", { minPrice: Number(minPrice) });
  if (maxPrice) qb.andWhere("sweet.price <= :maxPrice", { maxPrice: Number(maxPrice) });

  const results = await qb.getMany();
  res.json(results);
});

// Admin: create sweet
router.post(
  "/",
  requireAdmin,
  body("name").notEmpty(),
  body("category").notEmpty(),
  body("price").isFloat({ gt: 0 }),
  body("quantity").isInt({ min: 0 }),
  async (req: AuthRequest, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, category, price, quantity, description } = req.body;
    const repo = sweetRepo();
    const exists = await repo.findOneBy({ name });
    if (exists) return res.status(400).json({ error: "Sweet name must be unique" });

    const sweet = repo.create({ name, category, price: Number(price), quantity: Number(quantity), description });
    await repo.save(sweet);
    res.status(201).json(sweet);
  }
);

// Update sweet (admin)
router.put(
  "/:id",
  requireAdmin,
  body("name").optional().notEmpty(),
  body("category").optional().notEmpty(),
  body("price").optional().isFloat({ gt: 0 }),
  body("quantity").optional().isInt({ min: 0 }),
  async (req: AuthRequest, res) => {
    const { id } = req.params;
    const repo = sweetRepo();
    const sweet = await repo.findOneBy({ id } as any);
    if (!sweet) return res.status(404).json({ error: "Not found" });

    const updates = req.body;
    repo.merge(sweet, updates);
    await repo.save(sweet);
    res.json(sweet);
  }
);

// Delete sweet (admin)
router.delete("/:id", requireAdmin, async (req: AuthRequest, res) => {
  const { id } = req.params;
  const repo = sweetRepo();
  const sweet = await repo.findOneBy({ id } as any);
  if (!sweet) return res.status(404).json({ error: "Not found" });
  await repo.remove(sweet);
  res.json({ success: true });
});

// Purchase: decrease quantity by 1 or by requested amount
router.post("/:id/purchase", async (req: AuthRequest, res) => {
  const { id } = req.params;
  const amount = Number(req.body.amount || 1);
  if (amount <= 0) return res.status(400).json({ error: "Invalid amount" });

  const repo = sweetRepo();
  const sweet = await repo.findOneBy({ id } as any);
  if (!sweet) return res.status(404).json({ error: "Sweet not found" });
  if (sweet.quantity < amount) return res.status(400).json({ error: "Not enough stock" });

  sweet.quantity = sweet.quantity - amount;
  await repo.save(sweet);
  res.json({ success: true, sweet });
});

// Restock (admin)
router.post("/:id/restock", requireAdmin, body("amount").isInt({ min: 1 }), async (req: AuthRequest, res) => {
  const { id } = req.params;
  const amount = Number(req.body.amount || 0);
  if (amount <= 0) return res.status(400).json({ error: "Invalid amount" });

  const repo = sweetRepo();
  const sweet = await repo.findOneBy({ id } as any);
  if (!sweet) return res.status(404).json({ error: "Sweet not found" });

  sweet.quantity = sweet.quantity + amount;
  await repo.save(sweet);
  res.json({ success: true, sweet });
});

export default router;
