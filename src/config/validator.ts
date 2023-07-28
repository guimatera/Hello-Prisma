import { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';

const prisma = new PrismaClient();

const userValidation = (method: any) => {
  switch (method) {
    case 'Create': {
      return [
        body('Name')
          .not()
          .isEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isAlpha('pt-BR', { ignore: ' -.' })
          .withMessage('This field only accept letters.'),
        body('Email')
          .not()
          .isEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isEmail()
          .withMessage('This field must be in email format.')
          .custom(async (value: string) => {
            const Email = await prisma.user.findFirst({
              where: {
                email: value
              }
            });
            if (Email) throw new Error('Email already taken.');
          })
          .bail()
      ];
    }
    case 'Update': {
      return [
        body('Name')
          .not()
          .isEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isAlpha('pt-BR', { ignore: ' -.' })
          .withMessage('This field only accept letters.'),
        body('Email')
          .not()
          .isEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isEmail()
          .withMessage('This field must be in email format.')
          .bail()
          .custom(async (value: string) => {
            const Email = await prisma.user.findFirst({
              where: {
                email: value
              }
            });
            if (Email) throw new Error('Email already taken.');
          })
          .bail()
      ];
    }
    default: {
      return [body().withMessage('Error')];
    }
  }
};

export default {
  userValidation
};
