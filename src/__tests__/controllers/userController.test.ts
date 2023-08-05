import { Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import userController from '../../controllers/userController';

interface User {
  id: Number;
  name: String;
  email: String;
  profile: {
    id: Number;
    userId: Number;
  };
}

let expectedUser: User = {
  id: 1,
  name: faker.string.alpha(10),
  email: faker.internet.email(),
  profile: {
    id: 1,
    userId: 1
  }
};

let updatedUser: User = {
  id: expectedUser.id,
  name: faker.string.alpha(10),
  email: faker.internet.email(),
  profile: {
    id: expectedUser.profile.id,
    userId: expectedUser.profile.userId
  }
};

describe('Create User Tests', () => {
  it('Should create a user sucessfully', async () => {
    const req: Partial<Request> = {
      body: {
        Name: expectedUser.name,
        Email: expectedUser.email
      }
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await userController.Create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expectedUser);
  });
});

describe('Find One User Tests', () => {
  it('Should find a user Successfully', async () => {
    const req: Partial<Request> = {
      params: {
        userId: String(expectedUser.id)
      }
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await userController.findOne(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expectedUser);
  });
});

describe('Find All Users Tests', () => {
  it('Should find all users Successfully', async () => {
    const req: Partial<Request> = {};

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await userController.findAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([expectedUser]);
  });
});

describe('Update One User Tests', () => {
  it('Should update a User Successfully', async () => {
    const req: Partial<Request> = {
      params: {
        userId: String(expectedUser.id)
      },
      body: {
        Name: updatedUser.name,
        Email: updatedUser.email
      }
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await userController.Update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });
});

describe('Delete One User Tests', () => {
  it('Should delete a User Successfully', async () => {
    const req: Partial<Request> = {
      params: {
        userId: String(updatedUser.id)
      }
    };

    const res: Partial<Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    await userController.Destroy(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });
});
