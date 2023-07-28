import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class categoryController {
  async Create(req: Request, res: Response) {
    try {
      const { Name } = req.body;

      const Category = await prisma.category.create({
        data: {
          name: Name
        }
      });

      return res.status(200).json(Category);
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { categoryId } = req.body;

      const Category = await prisma.category.findUnique({
        where: {
          id: Number(categoryId)
        }
      });

      if (Category != null) {
        return res.status(200).json(Category);
      } else {
        return res.status(404).json('Category not found.');
      }
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const Categories = await prisma.category.findMany();

      if (Categories != null) {
        return res.status(200).json(Categories);
      } else {
        return res.status(404).json('There are no records of Categories.');
      }
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }

  async Update(req: Request, res: Response) {
    try {
      const { Name } = req.body;
      const { categoryId } = req.params;

      const Category = await prisma.category.update({
        where: {
          id: Number(categoryId)
        },
        data: {
          name: Name
        }
      });

      if (Category != null) {
        return res.status(200).json(Category);
      } else {
        return res.status(404).json('Category not found.');
      }
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }

  async Destroy(req: Request, res: Response) {
    try {
      const { categoryId } = req.body;

      const Category = await prisma.category.delete({
        where: {
          id: Number(categoryId)
        }
      });

      if (Category != null) {
        return res.status(200).json(Category);
      } else {
        return res.status(404).json('Category not found.');
      }
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }
}

export default new categoryController();
