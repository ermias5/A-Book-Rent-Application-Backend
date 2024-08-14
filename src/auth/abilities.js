import { PureAbility, AbilityBuilder } from "@casl/ability";

// import { PrismaAbility, Subjects } from "@casl/prisma";

// const defineAbilityFor = (user = {}) => {
//   const { can, cannot, build } = new AbilityBuilder(PureAbility);

//   if (user.role === "ADMIN") {
//     can("manage", "all", {admin:admin.id});
//   } else if (user.role === "OWNER") {
//     can("update", "book", { onerId: onwer.id }); //only if they own it

//     // cannot('delete', 'user').because('only admins can delete the user')
//   } else {
//     can("red", "book");
//   }

//   return build();
// };

// const user = {
//   isAdmin: true,
//   id: 5,
// };

// class Post {
//   constructor(autorId) {
//     this.autorId = autorId;
//   }
// }

// const SomePost = new Post(7);

// const ability = defineAbilityFor(user);

// const isAllowed = ability.can("read", SomePost);
// isAllowed;

// ForbiddenError.from(ability).throwUnlessCan("delete", SomePost);

// export default defineAbilityFor;

let ANNONYMOUS_ABILITY;
export function defineAbilityFor(user) {
  if (user) {
    return new PureAbility();
  }
  ANNONYMOUS_ABILITY = ANNONYMOUS_ABILITY || new PureAbility(defineRuleFor({})); //readiness for ability

  return ANNONYMOUS_ABILITY;
}

export function defineRuleFor(user) {
  const builder = new AbilityBuilder(PureAbility);

  switch (user.role) {
    case "ADMIN":
      defineAdminRules(builder, user);
      break;
    case "OWNER":
      defineOwnerRules(builder, user);
      definePublicRules(builder);
      break;
    default:
      definePublicRules(builder);
      break;
  }

  return builder.rules;
}

function defineAdminRules({ can }) {
  can("manage", "all");
}

function defineOwnerRules({ can }, user) {
  can(["read", "create", "update", "delete"], ["rental", "book"], {
    owner: user.id,
  });

  can("publish", "book", {
    author: user.id,
    published: false,
  });

  can(["read", "update"], "User", { publicUser: user.id });
}

function definePublicRules({ can }) {
  can("read", "book", { published: true });
}
