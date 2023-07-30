import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const prisma = new PrismaClient();

class PostController {
  async Create(req: Request, res: Response) {
    try {
      validationResult(req).throw();
      const { Title, Content, Published, userId, categoryId, Type } = req.body;

      const Post = await prisma.post.create({
        data: {
          title: Title,
          content: Content,
          published: Boolean(Published),
          author: {
            connect: {
              id: Number(userId)
            }
          }
        },
        include: {
          author: true
        }
      });

      for (let i = 0; i < categoryId.length; i++) {
        await prisma.postCategories.create({
          data: {
            categoryId: Number(categoryId[i]),
            postId: Number(Post.id),
            type: Type
          }
        });
      }

      return res.status(200).json(Post);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { postId } = req.body;

      const Post = await prisma.post.findUnique({
        where: {
          id: Number(postId)
        },
        include: {
          author: true,
          postCategories: true
        }
      });

      if (Post != null) {
        return res.status(200).json(Post);
      } else {
        return res.status(404).json('Post not found.');
      }
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const Posts = await prisma.post.findMany({
        include: {
          author: true,
          postCategories: true
        }
      });

      if (Posts != null) {
        return res.status(200).json(Posts);
      } else {
        return res.status(404).json('There are no records of Posts.');
      }
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }

  async Update(req: Request, res: Response) {
    try {
      validationResult(req).throw();
      const { Title, Content, categoryId } = req.body;
      const { postId } = req.params;

      const Post = await prisma.post.update({
        where: {
          id: Number(postId)
        },
        data: {
          title: Title,
          content: Content,
          published: true,
          postCategories: {
            deleteMany: {}
          }
        },
        include: {
          author: true,
          postCategories: true
        }
      });

      for (let i = 0; i < categoryId.length; i++) {
        await prisma.postCategories.create({
          data: {
            postId: Number(Post.id),
            categoryId: Number(categoryId[i])
          }
        });
      }

      if (Post != null) {
        return res.status(200).json(Post);
      } else {
        return res.status(404).json('Post not found.');
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async Destroy(req: Request, res: Response) {
    try {
      const { postId } = req.body;

      const Post = await prisma.post.delete({
        where: {
          id: Number(postId)
        }
      });

      if (Post != null) {
        return res.status(200).json(Post);
      } else {
        return res.status(404).json('Post not found.');
      }
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }
}

export default new PostController();
