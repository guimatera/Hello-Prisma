import { PrismaClient } from '@prisma/client';
import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

class UserController {
  async Create(req: Request, res: Response) {
    try {
      validationResult(req).throw();
      const { Name, Email } = req.body;

      const User = await prisma.user.create({
        data: {
          email: Email,
          name: Name,
          profile: {
            create: {}
          }
        },
        include: {
          profile: true
        }
      });

      return res.status(200).json(User);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { userId } = req.params;

      const User = await prisma.user.findUnique({
        where: {
          id: Number(userId)
        },
        include: {
          profile: true
        }
      });

      if (User != null) {
        return res.status(200).json(User);
      } else {
        return res.status(404).json('User not found.');
      }
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const Users = await prisma.user.findMany({
        include: {
          profile: true
        }
      });

      if (Users != null) {
        return res.status(200).json(Users);
      } else {
        return res.status(404).json('There are no records of Users.');
      }
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }

  async Update(req: Request, res: Response) {
    try {
      validationResult(req).throw();
      const { Name, Email } = req.body;
      const { userId } = req.params;

      const User = await prisma.user.update({
        where: {
          id: Number(userId)
        },
        data: {
          name: Name,
          email: Email
        },
        include: {
          profile: true
        }
      });

      if (User != null) {
        return res.status(200).json(User);
      } else {
        return res.status(404).json('User not found.');
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  async Destroy(req: Request, res: Response) {
    try {
      const { userId } = req.params;
      
      const User = await prisma.user.delete({
        where: {
          id: Number(userId)
        },
        include: {
          profile: true
        }
      });

      if (User != null) {
        return res.status(200).json(User);
      } else {
        return res.status(404).json('User not found.');
      }
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }

  async Follow(req: Request, res: Response) {
    try {
      const { followerId } = req.params;
      const { followingId } = req.body;

      const follow = await prisma.follows.create({
        data: {
          follower: {
            connect: {
              id: Number(followerId)
            }
          },
          following: {
            connect: {
              id: Number(followingId)
            }
          }
        }
      });

      return res.status(200).json(follow);
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }

  async Unfollow(req: Request, res: Response) {
    try {
      const { followerId } = req.params;
      const { followingId } = req.body;

      const unfollow = await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followingId: Number(followingId),
            followerId: Number(followerId)
          }
        }
      });

      return res.status(200).json(unfollow);
    } catch (error) {
      return res.status(500).json(error + '!');
    }
  }
}

export default new UserController();
