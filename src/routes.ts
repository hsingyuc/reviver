import { UserController } from "./controller/UserController";
import { ReceiverController } from "./controller/ReceiverController";
import { EventController } from "./controller/EventController";
import { AuthController } from "./controller/AuthController";

export const Routes = [{
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
}, {
    method: "get",
    route: "/receivers/:id",
    controller: ReceiverController,
    action: "one"
}, {
    method: "post",
    route: "/receivers",
    controller: ReceiverController,
    action: "create"
}, {
    method: "delete",
    route: "/receivers/:id",
    controller: ReceiverController,
    action: "remove"
}, {
    method: "put",
    route: "/receivers/:id",
    controller: ReceiverController,
    action: "update"
}, {
    method: "get",
    route: "/events/:id",
    controller: EventController,
    action: "one"
}, {
    method: "post",
    route: "/events",
    controller: EventController,
    action: "create"
}, {
    method: "delete",
    route: "/events/:id",
    controller: EventController,
    action: "remove"
}, {
    method: "put",
    route: "/events/:id",
    controller: EventController,
    action: "update"
}, {
    method: "post",
    route: "/auth/register",
    controller: AuthController,
    action: "register"
}, {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    action: "login"
}];