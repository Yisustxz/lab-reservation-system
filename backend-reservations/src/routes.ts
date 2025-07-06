import express from "express";
import { reservationModel } from "./models";
import {
  CreateReservationData,
  createReservationSchema,
  UpdateReservationData,
  updateReservationSchema,
} from "./types";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reservations = await reservationModel.getAll();
    res.json(reservations);
  } catch (error) {
    console.error("Error getting reservations:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/details", async (req, res) => {
  try {
    const reservations = await reservationModel.getWithDetails();
    res.json(reservations);
  } catch (error) {
    console.error("Error getting reservations with details:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const reservation = await reservationModel.getById(id);
    if (!reservation) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }

    res.json(reservation);
  } catch (error) {
    console.error("Error getting reservation:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/computer/:computerId", async (req, res) => {
  try {
    const computerId = parseInt(req.params.computerId);
    if (isNaN(computerId)) {
      return res.status(400).json({ error: "ID de computadora inválido" });
    }

    const reservations = await reservationModel.getByComputerId(computerId);
    res.json(reservations);
  } catch (error) {
    console.error("Error getting reservations by computer:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/user/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "ID de usuario inválido" });
    }

    const reservations = await reservationModel.getByUserId(userId);
    res.json(reservations);
  } catch (error) {
    console.error("Error getting reservations by user:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/status/:status", async (req, res) => {
  try {
    const status = req.params.status;
    const validStatuses = [
      "pendiente",
      "confirmada",
      "completada",
      "cancelada",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Estado inválido" });
    }

    const reservations = await reservationModel.getByStatus(status);
    res.json(reservations);
  } catch (error) {
    console.error("Error getting reservations by status:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.get("/date-range/:startDate/:endDate", async (req, res) => {
  try {
    const { startDate, endDate } = req.params;
    const computerId = req.query.computerId
      ? parseInt(req.query.computerId as string)
      : undefined;

    const reservations = await reservationModel.getByDateRange(
      startDate,
      endDate,
      computerId
    );
    res.json(reservations);
  } catch (error) {
    console.error("Error getting reservations by date range:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { error, value } = createReservationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const data: CreateReservationData = value;

    const isAvailable = await reservationModel.checkAvailability(
      data.computer_id,
      data.fecha,
      data.hora
    );

    if (!isAvailable) {
      return res.status(409).json({
        error: "La computadora no está disponible en ese horario",
      });
    }

    const reservation = await reservationModel.create(data);
    res.status(201).json(reservation);
  } catch (error) {
    console.error("Error creating reservation:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const { error, value } = updateReservationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const data: UpdateReservationData = value;

    const existingReservation = await reservationModel.getById(id);
    if (!existingReservation) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }

    if (data.computer_id && data.fecha && data.hora) {
      const isAvailable = await reservationModel.checkAvailability(
        data.computer_id,
        data.fecha,
        data.hora,
        id
      );

      if (!isAvailable) {
        return res.status(409).json({
          error: "La computadora no está disponible en ese horario",
        });
      }
    }

    const updatedReservation = await reservationModel.update(id, data);
    if (!updatedReservation) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }

    res.json(updatedReservation);
  } catch (error) {
    console.error("Error updating reservation:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ error: "ID inválido" });
    }

    const deleted = await reservationModel.delete(id);
    if (!deleted) {
      return res.status(404).json({ error: "Reservación no encontrada" });
    }

    res.json({ message: "Reservación eliminada exitosamente" });
  } catch (error) {
    console.error("Error deleting reservation:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/check-availability", async (req, res) => {
  try {
    const { computer_id, fecha, hora, exclude_reservation_id } = req.body;

    if (!computer_id || !fecha || !hora) {
      return res.status(400).json({
        error: "computer_id, fecha y hora son requeridos",
      });
    }

    const isAvailable = await reservationModel.checkAvailability(
      computer_id,
      fecha,
      hora,
      exclude_reservation_id
    );

    res.json({ available: isAvailable });
  } catch (error) {
    console.error("Error checking availability:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
