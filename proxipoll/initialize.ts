import { writeFileSync } from "fs";


/**
 * The results of parsing command-line arguments.
 */
interface ArgumentParseResults {
  /**
   * The port used by the backend Express server.
   */
  backend_port?: number,

  /**
   * The username for a PostgreSQL admin.
   */
  db_admin_username?: string,

  /**
   * The password for a PostgreSQL admin.
   */
  db_admin_password?: string,

  /**
   * The username for a PostgreSQL user with read/write permissions.
   */
  db_user_username?: string,

  /**
   * The password for a PostgreSQL user with read/write permissions.
   */
  db_user_password?: string,

  /**
   * The PostgreSQL database to connect to.
   */
  db_database?: string,

  /**
   * The PostgreSQL host to connect to.
   */
  db_host?: string,

  /**
   * The PostgreSQL port to connect to.
   */
  db_port?: number
}

/**
 * Checks if a `.env` file exists at `filepath`.
 * If it doesn't exist, a `.env` file with default values from read command-line
 * argmuents is created.
 * 
 * @param filepath the path to a `.env` file.
 * @param defaults defaults provided to the `.env` file.
 */
function create_env_file(filepath: string, defaults: ArgumentParseResults): void {
  writeFileSync(
    filepath,
    "# Environment variables used in ProxiPoll; edit as necessary.\n"
    + "# Keep these stored locally! The .gitignore will prevent this from being pushed.\n\n"
    + "# BACKEND_PORT: The port used by the backend Express server.\n"
    + `BACKEND_PORT=${defaults.backend_port}\n\n`
    + "# POSTGRES_*: Credentials to a PostgreSQL user with read/write permissions.\n"
    + `POSTGRES_USERNAME='${defaults.db_user_username}'\n`
    + `POSTGRES_PASSWORD='${defaults.db_user_password}'\n`
    + `POSTGRES_DATABASE='${defaults.db_database}'\n`
    + `POSTGRES_HOST='${defaults.db_host}'\n`
    + `POSTGRES_PORT=${defaults.db_port}\n\n`
    + "# NODE_ENV: Set to either \"development\" or \"production\".\n"
    + "NODE_ENV='development'"
  );
  console.log(`Created new '.env' file at '${__dirname + filepath.slice(1)}'.`);
  return;
}

/**
 * Creates a PostgreSQL stored procedure from provided command-line arguments.
 * 
 * @param filepath the path to create an SQL file.
 * @param values defaults provided to the SQL file.
 */
function create_sql_file(filepath: string, values: ArgumentParseResults): void {
  writeFileSync(
    filepath,
    "-- Generated SQL procedures created during initialization.\n\n"
    + "-- Create new extensions.\n"
    + "-- Note that these extensions must be installed beforehand.\n"
    + "CREATE EXTENSION pg_cron;\n"
    + "CREATE EXTENSION postgis;\n\n"
    + "-- Create new schemas.\n"
    + `CREATE SCHEMA users AUTHORIZATION ${values.db_admin_username};\n`
    + `CREATE SCHEMA data AUTHORIZATION ${values.db_admin_username};\n\n`
    + "-- Create new tables.\n"
    + "CREATE TABLE users.accounts (\n"
    + "    account_id SERIAL PRIMARY KEY,\n"
    + "    email TEXT NOT NULL UNIQUE,\n"
    + "    username TEXT NOT NULL UNIQUE,\n"
    + "    password TEXT NOT NULL,\n"
    + "    created_on TIMESTAMP WITHOUT TIME ZONE NOT NULL,\n"
    + "    profile_picture TEXT DEFAULT NULL\n"
    + ");\n"
    + "CREATE TABLE data.polls (\n"
    + "    poll_id SERIAL PRIMARY KEY,\n"
    + "    account_id INTEGER REFERENCES users.accounts(account_id) ON DELETE CASCADE,\n"
    + "    latlong GEOGRAPHY NOT NULL,\n"
    + "    active BOOLEAN NOT NULL,\n"
    + "    type CHARACTER(1) NOT NULL,\n"
    + "    created_on TIMESTAMP WITHOUT TIME ZONE NOT NULL,\n"
    + "    expires_on TIMESTAMP WITHOUT TIME ZONE,\n"
    + "    question TEXT NOT NULL,\n"
    + "    options TEXT[] NOT NULL\n"
    + ");\n"
    + "CREATE TABLE data.votes (\n"
    + "    vote_id SERIAL PRIMARY KEY,\n"
    + "    poll_id INTEGER REFERENCES data.polls(poll_id) ON DELETE CASCADE,\n"
    + "    account_id INTEGER REFERENCES users.accounts(account_id) ON DELETE CASCADE,\n"
    + "    vote SMALLINT,\n"
    + "    response TEXT,\n"
    + "    UNIQUE(poll_id, account_id)\n"
    + ");\n\n"
  );
  console.log(`Created new 'initialize_database.sql' file at '${__dirname + filepath.slice(1)}'.`);
  return;
}

/**
 * Parses command-line arguments.
 * 
 * @returns an object containing (supported) parsed values.
 */
function parse_arguments(): ArgumentParseResults {
  const results: ArgumentParseResults = {};
  process.argv
    .slice(2) // Discard first two arguments, as they aren't relevant.
    .forEach(arg => {
      // Split the argument by the "=" into two parts.
      // Match the first part with valid commands to handle the second part.
      const arg_parts: string[] = arg.split("=", 2);
      let arg_cmd: string = arg_parts[0].slice(2); // Discard "--".
      let arg_val: string = arg_parts[1];

      // "admin" and "user" are handled similarly.
      // Read <username>:<password> into results.
      if (arg_cmd === "db_admin") {
        const val_parts: string[] = arg_val.split(":");
        results.db_admin_username = val_parts[0];
        results.db_admin_password = val_parts[1];
      } else if (arg_cmd === "db_user") {
        const val_parts: string[] = arg_val.split(":");
        results.db_user_username = val_parts[0];
        results.db_user_password = val_parts[1];
      
      // "backend_port" and "db_port" are handled similarly.
      // Convert to integer and read into results.
      } else if (arg_cmd === "backend_port") {
        results.backend_port = +arg_val;
      } else if (arg_cmd === "db_port") {
        results.db_port = +arg_val;
      
      // "db_database" and "db_host" are handled similarly.
      // Simply read into results.
      } else if (arg_cmd === "db_host") {
        results.db_host = arg_val;
      } else if (arg_cmd === "db_database") {
        results.db_database = arg_val;
      
      // Unrecognized argument; throw error.
      } else {
        throw Error(`Unknown argument "${arg_cmd}"`);
      }
    });
  
  // The initialization script requires some arguments.
  // Check and see if they were provided, and throw an error if not.
  if (results.db_admin_username === undefined || results.db_admin_password === undefined) {
    throw Error("'db_admin' argument malformed/undefined");
  }
  if (results.db_user_username === undefined || results.db_user_password === undefined) {
    throw Error("'db_user' argument malformed/undefined");
  }
  if (results.db_database === undefined) {
    throw Error("'db_database' argument malformed/undefined");
  }
  // Some arguments have default values.
  if (results.db_host === undefined) {
    results.db_host = "localhost";
    console.log("NOTE: 'db_host' argument undefined; defaulting to 'localhost'.");
  }
  if (results.db_port === undefined) {
    results.db_port = 5432;
    console.log("NOTE: 'db_port' argument undefined; defaulting to 5432.");
  }
  if (results.backend_port === undefined) {
    results.backend_port = 7500;
    console.log("NOTE: 'backend_port' argument undefined; defaulting to 7500.");
  }
  return results;
}

// Parse command-line arguments and set up the user's environment and database.
const parsed_args: ArgumentParseResults = parse_arguments();
create_env_file(
  "./.env",
  parsed_args
);
create_sql_file(
  "./database/procedures/initialize_database.sql",
  parsed_args
);
console.log(
  "\nEnvironment variables and PostgreSQL initialization script created.\n\n"
  + "To finish initialization, navigate to your 'postgresql.conf' file and add the following lines under 'CUSTOMIZED OPTIONS':\n"
  + "  shared_preload_libraries = 'pg_cron'\n"
  + `  cron.database_name = '${parsed_args.db_database}'\n`
  + "  cron.use_background_workers = on\n\n"
  + "Then, login to PostgreSQL as the 'postgres' user and run the following in order:\n"
  + `  CREATE USER ${parsed_args.db_admin_username} `
  + `WITH SUPERUSER PASSWORD '<your ${parsed_args.db_admin_password?.length}-character admin password>';\n`
  + `  CREATE USER ${parsed_args.db_user_username} `
  + `WITH PASSWORD '<your ${parsed_args.db_user_password?.length}-character user password>';\n`
  + `  CREATE DATABASE ${parsed_args.db_database} WITH OWNER ${parsed_args.db_admin_username};\n\n`
  + `Then, logout of the 'postgres' user and run the following command in the normal terminal:\n`
  + `  psql postgresql://${parsed_args.db_admin_username}:`
  + `<your ${parsed_args.db_admin_password?.length}-character admin password>`
  + `@${parsed_args.db_host}`
  + `:${parsed_args.db_port}`
  + `/${parsed_args.db_database} `
  + "-f ./database/procedures/initialize_database.sql\n\n"
  + "After this, your database should be initialized.\n"
  + "Refer to the README for a more detained explanation."
);
