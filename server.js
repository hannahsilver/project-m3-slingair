"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const { flights } = require("./test-data/flightSeating");
const { reservations } = require("./test-data/reservations");

express()
  .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  })
  .use(morgan("dev"))
  .use(express.static("public"))
  .use(bodyParser.json())
  .use(express.urlencoded({ extended: false }))

  // endpoints
  .get("/flights/:flightnum", (req, res) => {
    const flightNum = req.params.flightnum;
    let flight = flightNum;
    let flightData = flights[flight];
    const flightArray = Object.keys(flights);
    const foundFlight = flightArray.find((flight) => {
      return flightNum === flight;
    });

    if (foundFlight === flightNum) {
      res.status(200).send({ flightData });
    } else {
      res.status(400).send("Flight not found.");
    }
  })

  .post("/users", (req, res) => {
    const { givenName, surname, email, flight, seat } = req.body;
    console.log(req.body);
    let values = Object(req.body);
    const reservation = {
      id: "random-id",
      flight,
      seat,
      givenName,
      surname,
      email,
    };
    reservations.push(reservation);
    console.log(reservations);
    if (values !== undefined) {
      res.status(200).json(reservation.id);
    }
  })

  .get("/reservations/:id", (req, res) => {
    const id = req.params.id;
    const reservation = reservations.find((reservation) => {
      return reservation.id === id;
    });

    if (reservation.id === id) {
      res.status(200).json(reservation);
    } else {
      res.status(400).send("Reservation not found.");
    }
  })

  .get("/flights", (req, res) => {
    return res.status(200).json(Object.keys(flights));
  })

  .use((req, res) => res.send("Not Found"))
  .listen(8000, () => console.log(`Listening on port 8000`));
