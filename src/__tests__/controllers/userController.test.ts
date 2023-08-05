import { Request, Response } from "express";
import { faker } from "@faker-js/faker";
import userController from "../../controllers/userController";

interface User {
  id: Number
  name: String;
  email: String;
  "profile": {
    id: Number,
    userId: Number
  }
}

let expectedUser: User = {
  id: 1,
  name: faker.string.alpha(10),
  email: faker.internet.email(),
  "profile": {
    id: 1,
    userId: 1
  }
};

let updatedUser: User = {
  id: expectedUser.id,
  name: faker.string.alpha(10),
  email: faker.internet.email(),
  "profile": {
    id: expectedUser.profile.id,
    userId: expectedUser.profile.userId
  }
};

describe("Create User Tests", () => {

  it("Should create a user sucessfully", async () => {

    const req: Partial <Request> = {
      body:{
        Name: expectedUser.name,
        Email: expectedUser.email
      }
    };
  
    const res: Partial <Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await userController.Create(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(expectedUser);

  });

});

describe("Find One User Tests", () => {

    it("Should find a user Successfully", async () => {

      const req: Partial <Request> = {
          params: {
            userId: String(expectedUser.id)
          }
      };

      const res: Partial <Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
      }

      await userController.findOne(req as Request, res as Response);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledTimes(1);
      expect(res.json).toHaveBeenCalledWith(expectedUser);
    });

});

describe("Find All Users Tests", () => {

  it("Should find all users Successfully", async () => {

    const req: Partial <Request> = {};

    const res: Partial <Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await userController.findAll(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith([expectedUser]);
  });

});

describe("Update One User Tests", () => {

  it("Should update a User Successfully", async () => {

    const req: Partial <Request> = {
        params: {
          userId: String(expectedUser.id)
        },
        body: {
          Name: updatedUser.name,
          Email: updatedUser.email
        }
    };

    const res: Partial <Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await userController.Update(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });

});

describe("Delete One User Tests", () => {

  it("Should delete a User Successfully", async () => {

    const req: Partial <Request> = {
        params: {
          userId:  String(updatedUser.id)
        }
    };

    const res: Partial <Response> = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    }

    await userController.Destroy(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(updatedUser);
  });

});
/*
describe('Create User Tests', () => {
  let userId: Number;
  let User: User = {
    Name: faker.person.firstName(),
    Email: faker.internet.email()
  };

  it('HTTP Status 201 - Working Fine', async () => {
    const Response = await request(app).post('/User').send(User);
    expect(Response.body).toMatchObject({
      id: expect.any(Number),
      name: User.Name,
      email: User.Email
    });
    expect(Response.statusCode).toBe(201);

    userId = Response.body.id;
  });

  it('HTTP Status 500 - Email already taken', async () => {
    const Response = await request(app).post('/User').send(User);
    expect(Response.statusCode).toBe(500);

    await request(app).delete(`/User/${userId}`);
  });

  it('HTTP Status 500 - Empty fields', async () => {
    let User: User = {
      Name: '',
      Email: ''
    };

    const Response = await request(app).post('/User').send(User);
    expect(Response.statusCode).toBe(500);
    expect(Response.body.errors.length == 2).toBe(true);
  });

  it('HTTP Status 500 - Incorrect Email Format', async () => {
    let User: User = {
      Name: faker.person.firstName(),
      Email: faker.person.firstName()
    };

    const Response = await request(app).post('/User').send(User);
    expect(Response.statusCode).toBe(500);
    expect(Response.body.errors.length == 1).toBe(true);
  });

  it('HTTP Status 500 - Only Letters in Name', async () => {
    const symbols: string[] = [' ', '.', '-'];

    symbols.forEach(async function (value) {
      let User: User = {
        Name: value + faker.string.alpha(5),
        Email: faker.internet.email()
      };

      const Response = await request(app).post('/User').send(User);
      expect(Response.statusCode).toBe(200);

      await request(app).delete(`/User/${Response.body.id}`);
    });

    let User: User = {
      Name: faker.string.sample(1) + faker.string.numeric(1),
      Email: faker.internet.email()
    };

    const Response = await request(app).post('/User').send(User);
    expect(Response.statusCode).toBe(500);
    expect(Response.body.errors.length == 1).toBe(true);
  });
});

describe('Find All Users Tests', () => {
  it('HTTP Status 200 - Working Fine', async () => {
    let userIds: Number[] = [];

    for (let i = 1; i <= 10; i++) {
      let User: User = {
        Name: faker.person.firstName(),
        Email: faker.internet.email()
      };
      let Res = await request(app).post(`/User`).send(User);
      userIds[i - 1] = Res.body.id;
    }

    const Response = await request(app).get(`/Users`);
    expect(Response.body.length).toBe(10);
    expect(Response.statusCode).toBe(200);

    for (let i = 1; i <= 10; i++) {
      await request(app).delete(`/User/${userIds[i - 1]}`);
    }
  });

  it('HTTP Status 404 - No records found', async () => {
    const Response = await request(app).get(`/Users`);
    expect(Response.body.length == 0).toBe(true);
    expect(Response.statusCode).toBe(404);
  });

  it('HTTP Status 500 - Internet Server Error', async () => {
    const Response = await request(app).get('/Users');
    expect(Response.statusCode).toBe(500);
    });
});

describe('Find One User Tests', () => {
  it('HTTP Status 200 - Working Fine', async () => {
    let userId: Number;

    let User: User = {
      Name: faker.person.firstName(),
      Email: faker.internet.email()
    };

    let Res = await request(app).post(`/User`).send(User);
    userId = Res.body.id;

    const retrievedUser = {
      id: userId,
      name: User.Name,
      email: User.Email,
      profile: {
        id: userId,
        userId: userId
      }
    };

    const Response = await request(app).get(`/User/${userId}`);
    expect(Response.body).toMatchObject(retrievedUser);
    expect(Response.statusCode).toBe(200);

    await request(app).delete(`/User/${userId}`);
  });
});

describe('Update One User Tests', () => {
  it('HTTP Status 200 - Working Fine', async () => {
    let userId: Number;

    let User: User = {
      Name: faker.person.firstName(),
      Email: faker.internet.email()
    };

    let Res = await request(app).post(`/User`).send(User);
    userId = Res.body.id;

    let updatedUser: User = {
      Name: faker.person.firstName(),
      Email: faker.internet.email()
    };

    let retrievedUser = {
      id: userId,
      name: updatedUser.Name,
      email: updatedUser.Email,
      profile: {
        id: userId,
        userId: userId
      }
    };
    const Response = await request(app).put(`/User/${userId}`).send(updatedUser);
    expect(Response.body).toMatchObject(retrievedUser);
    expect(Response.statusCode).toBe(200);

    await request(app).delete(`/User/${userId}`);
  });
});

describe('Delete One User Tests', () => {
  it('HTTP Status 200 - Working Fine', async () => {
    let userId: Number;

    let User: User = {
      Name: faker.person.firstName(),
      Email: faker.internet.email()
    };

    let Res = await request(app).post(`/User`).send(User);
    userId = Res.body.id;

    let deletedUser = {
      id: userId,
      name: User.Name,
      email: User.Email,
      profile: {
        id: userId,
        userId: userId
      }
    };

    const Response = await request(app).delete(`/User/${userId}`);
    expect(Response.body).toMatchObject(deletedUser);
    expect(Response.statusCode).toBe(200);
  });
});

/*

it("Should not find a User", async () => {
  const nonExistentId = 10000;
  const Response = await request(app).get(`/User/${nonExistentId}`);
  expect(Response.statusCode).toBe(404);
});

it("Should not find a User", async () => {
  const Response = await request(app).get(`/User/`);
  expect(Response.statusCode).toBe(500);
});*/
