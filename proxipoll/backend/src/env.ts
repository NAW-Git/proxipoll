import dotenv from "dotenv";
import { existsSync, writeFileSync } from "fs";

/**
 * Reads in environment variables from a `.env` file.
 * If it doesn't exist, a `.env` file with default values is created.
 * 
 * @param filepath the path to a `.env` file.
 * @returns true if a `.env` file exists, false otherwise.
 */
function initialize_env(filepath: string): boolean {
  if (!existsSync(filepath)) {
    writeFileSync(
      filepath,
      "# Backend and database environment variables; edit as necessary.\n"
      + "BACKEND_PORT=7500\n"
      + "POSTGRES_USERNAME='proxipoll'\n"
      + "POSTGRES_PASSWORD='proximiy'\n"
      + "POSTGRES_DATABASE='proxipoll'\n"
      + "POSTGRES_HOST='localhost'\n"
      + "POSTGRES_PORT=5432"
    );
    return false;
  }
  dotenv.config({path: filepath});
  return true;
}

export default initialize_env;
