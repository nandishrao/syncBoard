import express from "express";
import Board from "../Models/board.js";
import protect from "../middleware/authMiddleware.js";
const router = express.Router();


router.post("/save", protect, async (req, res) => {
  const { roomId, data } = req.body;

  let board = await Board.findOne({ roomId });

  if (board) {
    board.data = data;
    await board.save();
  } else {
    board = await Board.create({ roomId, data });
  }

  res.json(board);
});

router.get("/:roomId", async (req, res) => {
  const board = await Board.findOne({
    roomId: req.params.roomId,
  });

  res.json(board);
});

export default router;