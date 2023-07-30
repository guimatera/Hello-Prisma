import { PrismaClient } from '@prisma/client';
import { body } from 'express-validator';

const prisma = new PrismaClient();

const userValidation = (method: any) => {
  switch (method) {
    case 'Create': {
      return [
        body('Name')
          .notEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isAlpha('pt-BR', { ignore: ' -.' })
          .withMessage('This field only accept letters.'),
        body('Email')
          .notEmpty()
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
          .notEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isAlpha('pt-BR', { ignore: ' -.' })
          .withMessage('This field only accept letters.'),
        body('Email')
          .notEmpty()
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

const postValidation = (method: String) => {
  switch (method) {
    case 'Create': {
      return [
        body('Title').notEmpty().withMessage('This field must not be empty.'),
        body('Content').notEmpty().withMessage('This field must not be empty.'),
        body('Published')
          .notEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isBoolean()
          .withMessage('This field must be boolean.'),
        body('Type')
          .notEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isAlpha('pt-BR', { ignore: ' -' })
          .withMessage('This field only accept letters.')
      ];
    }
    case 'Update': {
      return [
        body('Title').notEmpty().withMessage('This field must not be empty.'),
        body('Content').notEmpty().withMessage('This field must not be empty.'),
        body('Published')
          .notEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isBoolean()
          .withMessage('This field must be boolean.'),
        body('Type')
          .notEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isAlpha('pt-BR', { ignore: ' -' })
          .withMessage('This field only accept letters.')
      ];
    }
    default: {
      return [body().withMessage('Error')];
    }
  }
};

const categoryValidation = (method: string) => {
  switch (method) {
    case 'Create': {
      return [
        body('Name')
          .notEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isAlpha('pt-BR', { ignore: ' -' })
          .withMessage('This field only accept letters.')
      ];
    }
    case 'Update': {
      return [
        body('Name')
          .notEmpty()
          .withMessage('This field must not be empty.')
          .bail()
          .isAlpha('pt-BR', { ignore: ' -' })
          .withMessage('This field only accept letters.')
      ];
    }
    default: {
      return [body().withMessage('Error')];
    }
  }
};

export default {
  userValidation,
  postValidation,
  categoryValidation
};
