import { Request, Response } from 'express';


import pool from '../database';

class BooksController {

    public async list(req: Request, res: Response): Promise<void> {
        const books = await pool.query('SELECT * FROM books');
        res.json(books);
    }

    public async getOne(req: Request, res: Response): Promise<any> {
        const { id } = req.params;
        const books = await pool.query('SELECT * FROM books WHERE id = ?', [id]);
        console.log(books.length);
        if (books.length > 0) {
            return res.json(books[0]);
        }
        res.status(404).json({ text: "The book doesn't exits" });
    }

    public async create(req: Request, res: Response): Promise<void> {
        const result = await pool.query('INSERT INTO books set ?', [req.body]);
        res.json({ message: 'Book Saved' });
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const oldBook = req.body;
        await pool.query('UPDATE books set ? WHERE id = ?', [req.body, id]);
        res.json({ message: "The book was Updated" });
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        await pool.query('DELETE FROM books WHERE id = ?', [id]);
        res.json({ message: "The book was deleted" });
    }
}

const booksController = new BooksController;
export default booksController;