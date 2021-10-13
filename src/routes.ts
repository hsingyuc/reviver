import { UserController } from "./controller/UserController";

export const Routes = [{
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "create"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    method: "put",
    route: "/users/:id",
    controller: UserController,
    action: "update"
}];