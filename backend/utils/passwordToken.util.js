import crypto from "crypto";

export const generatePasswordToken = () => {
  return crypto.randomBytes(20).toString("hex");
};
