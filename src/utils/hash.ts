import crypto from "crypto";

interface IverifyPassword {
  candidatePassword: string;
  salt: string;
  hash: string;
}
export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");

  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  return { hash, salt };
};

export const verifyPassword = ({
  candidatePassword,
  salt,
  hash,
}: IverifyPassword) => {
  const candidateHash = crypto
    .pbkdf2Sync(candidatePassword, salt, 100, 64, "sha512")
    .toString("hex");

  return candidateHash === hash;
};
