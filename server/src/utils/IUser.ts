// **** Variables **** //

const INVALID_CONSTRUCTOR_PARAM = "nameOrObj arg must a string or an " + 
  "object with the appropriate user keys.";


// **** Types **** //

export interface IUser {
  id: string;
  fName: string;
  lName: string;
  email: string;
  password: string;
}


// **** Functions **** //

/**
 * Create new User.
 */
function new_(
  fName: string,
  lName: string,
  email: string,
  password: string,
  id: string,
): IUser {
  return {
    id: (id ?? ""),
    fName: (fName ?? ""),
    lName: (lName ?? ""),
    email: (email ?? ""),
    password: (password ?? ""),
  };
}

/**
 * Get user instance from object.
 */
function from(param: object): IUser {
  // Check is user
  if (!isUser(param)) {
    throw new Error(INVALID_CONSTRUCTOR_PARAM);
  }
  // Get user instance
  const p = param as IUser;
  return new_(p.id, p.fName, p.lName, p.email, p.password);
}

/**
 * See if the param meets criteria to be a user.
 */
function isUser(arg: unknown): boolean {
  return (
    !!arg &&
    typeof arg === "object" &&
    "id" in arg &&
    "email" in arg &&
    "fName" in arg &&
    "lName" in arg &&
    "password" in arg
  );
}


// **** Export default **** //

export default {
  new: new_,
  from,
  isUser,
} as const;
