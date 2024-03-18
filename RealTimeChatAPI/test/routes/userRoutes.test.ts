import { describe, expect, it } from "vitest";
import userRoutes from "../../src/routes/userRoutes.js";
// import { generatToken } from "../../src/utils/generateToken.js";

describe("user Routes file should have routes", () => {
  const routes = [
    { path: "/signup", method: "post" },
    { path: "/signin", method: "post" },
    { path: "/logout", method: "get" },
    { path: "/get/data/:userId", method: "get" },
    { path: "/get/all", method: "get" },
    { path: "/update/:userId", method: "put" },
    { path: "/delete/:userId", method: "delete" },
  ];

  routes.forEach((route) => {
    const { path, method } = route;
    it(`${method} exists on ${path}`, () => {
      expect(
        userRoutes.stack.some((s) =>
          Object.keys(s.route.methods).includes(route.method),
        ),
      ).toBe(true);
      expect(userRoutes.stack.some((s) => s.route.path === route.path)).toBe(
        true,
      );
    });
  });
});

// describe("Should call routes successfully", () => {
//   const routes = [
//     {
//       path: "/signup",
//       method: "post",
//       data: {
//         userFullName: "bobe Doe",
//         userName: "bobe",
//         email: "bobedoe@mail.com",
//         password: "John2@!.",
//       },
//     },
//     {
//       path: "/signin",
//       method: "post",
//       data: {
//         email: "bobedoe@mail.com",
//         password: "John2@!.",
//       },
//     },
//     { path: "/logout", method: "get", token: "" },
//     { path: "/get/data/1000", method: "get", userId: "1" },
//     { path: "/get/all", method: "get" },
//     {
//       path: "/update/:userId",
//       method: "put",
//       data: {
//         userFullName: "bobe Doe",
//         userName: "bobe",
//       },
//     },
//     { path: "/delete/:userId", method: "delete", userId: "1" },
//   ];

//   routes.forEach((route) => {
//     const { path, method } = route;
//     if(method === "get"){
//       it(`Should execute ${method} on ${path} sucessfully`, () => {
//         if (route.token){
//           route.token = generatToken({1,"yes"});
//         }

//         expect(
//           userRoutes.stack.some((s) =>
//             Object.keys(s.route.methods).includes(route.method),
//           ),
//         ).toBe(true);
//         expect(userRoutes.stack.some((s) => s.route.path === route.path)).toBe(
//           true,
//         );
//       });
//     }
//   });
// });
