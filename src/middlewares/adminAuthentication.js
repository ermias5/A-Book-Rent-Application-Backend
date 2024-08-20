import { ForbiddenError } from "@casl/ability";
import defineAbility from "../auth/abilities.js";
import jwtAuthentication from "./jwtAuthentication.js";

const adminAuthentication = (req, res, next) => {
  jwtAuthentication(req, res, () => {
    const user = req.user;

    const ability = defineAbility(user);

    try {
      ForbiddenError.from(ability).throwUnlessCan("manage", "all");
      next();
    } catch (err) {
      res.status(403).json({ error: "Access denied" });
    }
  });
};

export default adminAuthentication;
