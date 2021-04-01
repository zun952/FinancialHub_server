"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var cors_1 = __importDefault(require("cors"));
var path_1 = __importDefault(require("path"));
var App = /** @class */ (function () {
    function App() {
        this.app = express();
        this.app.use(cors_1.default());
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(express.json());
        this.app.use(express.static(path_1.default.join(__dirname, 'public')));
        this.app.get("/", function (req, res) {
            res.send("hello");
        });
        this.app.get("/Acct", function (req, res) {
            res.json({
                "id": "id",
                "password": "password"
            });
        });
        this.app.post("/Acct", function (req, res) {
            var _a = req.body, id = _a.id, password = _a.password;
            res.json({
                "id": id,
                "pw": password
            });
        });
    }
    App.bootstrap = function () {
        return new App();
    };
    return App;
}());
exports.default = App;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGlDQUFvQztBQUNwQyw4Q0FBd0I7QUFDeEIsOENBQXdCO0FBTXhCO0lBUUk7UUFDSSxJQUFJLENBQUMsR0FBRyxHQUFHLE9BQU8sRUFBRSxDQUFDO1FBRXJCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLGNBQUksRUFBRSxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFFN0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQUMsR0FBb0IsRUFBRSxHQUFxQjtZQUMxRCxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLFVBQUMsR0FBb0IsRUFBRSxHQUFxQjtZQUM5RCxHQUFHLENBQUMsSUFBSSxDQUFDO2dCQUNMLElBQUksRUFBRSxJQUFJO2dCQUNWLFVBQVUsRUFBRSxVQUFVO2FBQ3pCLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQUMsR0FBb0IsRUFBRSxHQUFxQjtZQUUzRCxJQUFBLEtBQ0EsR0FBRyxLQURpQixFQUFiLEVBQUUsUUFBQSxFQUFFLFFBQVEsY0FBQyxDQUNoQjtZQUVSLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ0wsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLFFBQVE7YUFDakIsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBakNhLGFBQVMsR0FBdkI7UUFDSSxPQUFPLElBQUksR0FBRyxFQUFFLENBQUM7SUFDckIsQ0FBQztJQWdDTCxVQUFDO0FBQUQsQ0FBQyxBQXRDRCxJQXNDQztBQUVELGtCQUFlLEdBQUcsQ0FBQyJ9