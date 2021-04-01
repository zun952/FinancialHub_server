"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("source-map-support/register");
var App_1 = __importDefault(require("./App"));
var port = Number(process.env.PORT) || 3000;
var app = new App_1.default().app;
app.listen(port, function () { return console.log("Express server listening at " + port); })
    .on('error', function (err) { return console.error(err); });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid3d3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3d3dy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHVDQUFxQztBQUNyQyw4Q0FBd0I7QUFJeEIsSUFBTSxJQUFJLEdBQVcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDO0FBQ3RELElBQU0sR0FBRyxHQUF3QixJQUFJLGFBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQztBQUUvQyxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxjQUFNLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBK0IsSUFBTSxDQUFDLEVBQWxELENBQWtELENBQUM7S0FDckUsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFDLEdBQUcsSUFBSyxPQUFBLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQWxCLENBQWtCLENBQUMsQ0FBQyJ9