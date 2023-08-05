import { Request, Response } from "express";
import categoryController from '../../controllers/categoryController';
import { faker } from "@faker-js/faker";


interface Category {
  id: Number,
  name: String;
}

let expectedCategory: Category = {
  id: 1,
  name: faker.string.alpha(10)
};

let updatedCategory: Category = {
  id: expectedCategory.id,
  name: faker.string.alpha(10)
};

describe("Create Category Tests", () => {

  it("Should create a category sucessfully", async () => {

    const req: Partial <Request> = {
      body:{
        Name: expectedCategory.name
      }
    };
  
    const res: Partial <Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await categoryController.Create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expectedCategory);

  });

});


describe("Find One Category Tests", () => {

    it("Should find a Category Successfully", async () => {

      const req: Partial <Request> = {
          params: {
            categoryId: String(expectedCategory.id)
          }
      };

      const res: Partial <Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      await categoryController.findOne(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(expectedCategory);
    });

});

describe("Find All Categories Tests", () => {

  it("Should find all Categories Successfully", async () => {

    const req: Partial <Request> = {};

    const res: Partial <Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await categoryController.findAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([expectedCategory]);
  });

});

describe("Update One Category Tests", () => {

  it("Should update a Category Successfully", async () => {

    const req: Partial <Request> = {
        params: {
          categoryId: String(expectedCategory.id)
        },
        body: {
          Name: updatedCategory.name
        }
    };

    const res: Partial <Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await categoryController.Update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(updatedCategory);
  });

});

describe("Delete One Category Tests", () => {

  it("Should delete a Category Successfully", async () => {

    const req: Partial <Request> = {
        params: {
          categoryId:  String(expectedCategory.id)
        }
    };

    const res: Partial <Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await categoryController.Destroy(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(updatedCategory);
  });

});
