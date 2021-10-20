import { UserController } from "./controller/UserController";
import { ReceiverController } from "./controller/ReceiverController";
import { EventController } from "./controller/EventController";

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
    route: "/events",
    controller: EventController,
    action: "all"
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
}];