import { UserController } from "./controller/UserController";
import { ReceiverController } from "./controller/ReceiverController";

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
}];