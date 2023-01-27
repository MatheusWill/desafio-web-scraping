import {
  CreateAccountRepository,
  CheckAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from "@/data/protocols/db";
import fs from "fs";

const readFile = () => {
  const content = fs.readFileSync(`${__dirname}/database.json`, "utf-8");
  return JSON.parse(content);
};

const writeFile = (content: any) => {
  const updateFile = JSON.stringify(content);
  fs.writeFileSync(`${__dirname}/database.json`, updateFile, "utf-8");
};

export class AccountRepository
  implements
    CreateAccountRepository,
    CheckAccountByEmailRepository,
    UpdateAccessTokenRepository
{
  async updateAccessToken(id: string, token: string): Promise<void> {
    const database = readFile();

    const selectId = database.findIndex((data: any) => data.id === id);

    const newObject = {
      name: database[selectId].name,
      email: database[selectId].email,
      password: database[selectId].password,
      token: token,
    };

    database[selectId] = newObject;

    writeFile(database);
  }

  async checkByEmail(email: string): CheckAccountByEmailRepository.Result {
    const database = readFile();

    const checkByEmail = database.find((data: any) => data.email === email);

    return checkByEmail;
  }
  async create({
    name,
    email,
    password,
  }: CreateAccountRepository.Params): CreateAccountRepository.Result {
    const database = readFile();

    const id = Math.random().toString(32).substring(2, 9);

    database.push({
      id: id,
      name,
      email,
      password,
    });

    writeFile(database);

    return {
      name,
      email,
    };
  }
}
