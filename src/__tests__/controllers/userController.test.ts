import request from "supertest";
import app from "../../index";
import { faker } from "@faker-js/faker";

interface User {
  Name: String;
  Email: String;
}


describe("Create User Tests", () => {
  let userId: Number;

  let User: User = {
    Name: faker.person.firstName(),
    Email: faker.internet.email()
  };

  it("HTTP Status 200 - Working Fine", async () => {
    const Response = await request(app).post("/User").send(User);
    expect(Response.body).toMatchObject({
      id: expect.any(Number),
      name: User.Name,
      email: User.Email,
    });
    expect(Response.statusCode).toBe(200);

    userId = Response.body.id;
    await request(app).delete(`/User/${userId}`);
  });
});

describe ("Find All Users Tests", () => {

  it("HTTP Status 200 - Working Fine", async () => {

    let userIds: Number[] = [];

    for(let i = 1; i <= 10; i++){
       let User: User = {
        Name: faker.person.firstName(),
        Email: faker.internet.email()
      };
      let Res = await request(app).post(`/User`).send(User);
      userIds[i-1] = Res.body.id;
    }

    const Response = await request(app).get(`/Users`);
    expect(Response.body.length).toBe(10);
    expect(Response.statusCode).toBe(200);

    for(let i = 1; i <= 10; i++){
      await request(app).delete(`/User/${userIds[i-1]}`);
    }
  });

});

describe("Find One User Tests", () => {

  it("HTTP Status 200 - Working Fine", async () => {

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

describe("Update One User Tests", () => {

  it("HTTP Status 200 - Working Fine", async () => {

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

describe("Delete One User Tests", () => {

  it("HTTP Status 200 - Working Fine", async () => {

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
