"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCar = exports.updateCar = exports.detailCar = exports.listCars = exports.registerCar = void 0;
const connection_1 = require("../database/connection");
// type Error = { message: string}
const registerCar = async (req, res) => {
    const { marca, modelo, ano, cor, valor } = req.body;
    try {
        const car = await (0, connection_1.knex)('cars')
            .insert({ marca: marca, modelo: modelo, ano: ano, cor: cor, valor: valor });
        if (!car) {
            res.status(500).json({ message: 'Error' });
        }
        return res.status(200).json({ message: 'Ok' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno' });
    }
};
exports.registerCar = registerCar;
const listCars = async (_, res) => {
    try {
        const cars = await (0, connection_1.knex)('cars');
        return res.status(200).json(cars);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno' });
    }
};
exports.listCars = listCars;
const detailCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await (0, connection_1.knex)('cars').where({ id: Number(id) }).first();
        if (!car) {
            return res.status(404).json({ message: "Not Found" });
        }
        return res.status(200).json(car);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno' });
    }
};
exports.detailCar = detailCar;
const updateCar = async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, ano, cor, valor } = req.body;
    try {
        const car = await (0, connection_1.knex)('cars').where({ id: Number(id) }).first();
        if (!car) {
            return res.status(404).json({ message: "Not Found" });
        }
        await (0, connection_1.knex)('cars').update({ marca, modelo, ano, cor, valor }).where({ id: Number(id) });
        return res.status(201).json({ message: "OK" });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno' });
    }
};
exports.updateCar = updateCar;
const deleteCar = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await (0, connection_1.knex)('cars').where({ id: Number(id) }).first();
        if (!car) {
            return res.status(404).json({ message: "Not Found" });
        }
        await (0, connection_1.knex)('cars').delete().where({ id: Number(id) });
        return res.status(200).json({ message: "Deleted" });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno' });
    }
};
exports.deleteCar = deleteCar;
