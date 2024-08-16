import { PureAbility, AbilityBuilder } from "@casl/ability";

const defineAbility = (user) => {
  const { can, cannot, build } = new AbilityBuilder(PureAbility);

  if (user.role === "ADMIN") {
    can("manage", "all");
  } else if (user.role === "OWNER") {
    can("read", "dashboard");
  }

  return build();
};

export default defineAbility;
