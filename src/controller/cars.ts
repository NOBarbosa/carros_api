import {Request, Response } from 'express'
import { knex } from '../database/connection'
import { Car } from '../types'



// type Error = { message: string}


export const registerCar = async (req: Request, res: Response) =>{
    const  {marca, modelo, ano, cor, valor} = req.body

    try {
        const car = await knex<Omit<Car, 'id'>>('cars')
        .insert({marca:marca, modelo:modelo, ano:ano, cor:cor, valor:valor})

        if(!car){
            res.status(500).json({message:'Error'})
        }

        return res.status(200).json({message:'Ok'})
    } catch (error) {
        return res.status(500).json({message:'Erro interno'})
    }
}

export const listCars = async (_: Request, res: Response) =>{
    try {
        const cars =  await knex<Car>('cars')
        return res.status(200).json(cars)
        
    } catch (error) {
        return res.status(500).json({message:'Erro interno'})
    }

}
export const detailCar = async (req: Request, res: Response) =>{
    const {id } = req.params
    try {
        const car = await knex<Car>('cars').where({id: Number(id)}).first()
        if(!car){
            return res.status(404).json({message: "Not Found"})
        }

        return res.status(200).json(car)

    } catch (error) {
        return res.status(500).json({message:'Erro interno'})
    }
}

export const updateCar = async (req: Request, res: Response) =>{
    const {id } = req.params
    const  {marca, modelo, ano, cor, valor} = req.body
    try {
        const car = await knex<Car>('cars').where({id: Number(id)}).first()
        if(!car){
            return res.status(404).json({message: "Not Found"})
        }

        await knex<Omit<Car, 'id'>>('cars').update({marca, modelo, ano, cor, valor})
        return res.status(201).json({message: "OK"})
    } catch (error) {
        return res.status(500).json({message:'Erro interno'})
    }
}
export const deleteCar = async (req: Request, res: Response) =>{

}

// export default {createCar,listCars, detailCar, updateCar, deleteCar}