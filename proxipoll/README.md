# ProxiPoll - Installation and Usage Guide

## Installation

### Step #0: Pre-Installation

This installation guide is specifically geared toward ProxiPoll and its dependencies.
The following programs/software are expected to be installed prior to starting the guide:

- **Bun** ([installation instructions](https://bun.sh/docs/installation))
- **PostgreSQL** ([installation instructions](https://www.postgresql.org/download/))

If all of the above is installed, continue to the first step.

### Step #1: Install PostGIS & pg_cron Extensions

ProxiPoll makes use of two PostgreSQL extensions:
**PostGIS** for handling latitude/longitude coordinates, and **pg_cron** for scheduled database maintenance tasks.
If your system does not have one or both of these extensions installed yet,
follow the PostGIS instructions [here](https://postgis.net/documentation/getting_started/#installing-postgis)
and the pg_cron instructions [here](https://github.com/citusdata/pg_cron#installing-pg_cron).  
Note that some database host services may come with one or both of these extensions pre-installed on the system.
If both of these extensions are already installed,
skip to the next step.

### Step #2: Bun Install

While in the ``proxipoll/`` directory (the same directory this README is in),
run the following:

```sh
bun install
```

This will install all Node.js dependencies for the frontend, backend, and the initialization script.

### Step #3: Run Initialization Script

While still in the ``proxipoll/`` directory,
run the following:

```sh
bun run initialize -- --backend_port=<port> --db_admin=<username:password> --db_user=<username:password> --db_database=<name> --db_host=<host> --db_port=<port>
```

where:

- **backend_port**: The ``<port>`` number that the Express backend will listen on. If argument not specified, defaults to ``7500``.
- **db_admin**: The ``<username>`` and ``<password>`` of the admin superuser that will be created for your database, separated by a colon (``:``). ``<username>`` and ``<password>`` must be alphanumeric. This argument is required.
- **db_user**: The ``<username>`` and ``<password>`` of the backend user making queries that will be created for your database, separated by a colon (``:``). ``<username>`` and ``<password>`` must be alphanumeric. This argument is required.
- **db_database**: The ``<name>`` of your database that will hold all of ProxiPoll's data. This argument is required.
- **db_host**: The ``<host>`` of your database. If argument not specified, defaults to ``'localhost'``.
- **db_port**: The ``<port>`` number that the PostgreSQL server will listen on. If argument not specified, defaults to ``5432``.

This script will create the necessary environment variables in a new ``.env`` file that will be read by the program and a specifically-made ``initialize_database.sql`` script for your database.

For example, the following:

```sh
bun run initialize -- --db_admin=bigman:bigsecret --db_user=smallman:smallsecret --db_database=bigdata --backend_port=2468
```

will be interpreted as:

- Backend port: ``2468``
- Admin username: ``'bigman'``
- Admin password: ``'bigsecret'``
- User username: ``'smallman'``
- User password: ``'smallsecret'``
- Database name: ``'bigdata'``
- Database host: ``'localhost'``
- Database port: ``'5432'``

After this script is run,
a lot of information is printed to ``stdout``;
these are instructions tailored to your passed arguments.
From here on, this guide will explain these generated instructions in greater detail.

### Step #4: Modify ``postgresql.conf`` File

Navigate to your PostgreSQL installation's ``postgresql.conf`` file.
The file location varies from system to system;
login to PostgreSQL as the 'postgres' user and run the following to find the path:

```sh
show config_file;
```

Once in the ``postgresql.conf`` file,
scroll to the very bottom and add the following lines under "CUSTOMIZED OPTIONS":

```sh
shared_preload_libraries = 'pg_cron'

# Optional.
cron.database_name = '<the database name you chose>'
cron.use_background_workers = on

# Optional, if cron.use_background_workers is enabled.
max_worker_processes = <number> # Default: 8
```

where:

- ``shared_preload_libraries`` loads the pg_cron background worker on PostgreSQL startup.
- Setting ``cron.database_name`` to ProxiPoll's database will add the pg_cron schema and tables into that database instead of the 'postgres' database default.
This is mainly for organizational purposes;
if you leave this line out, you'll be using ``cron.schedule_in_database()`` instead of ``cron.schedule()`` for adding cron jobs.
- By default, pg_cron will attempt to run its cron jobs by opening a connection to the database,
which might require modifying the ``pg_hba.conf`` file to allow these connections (see [here](https://github.com/citusdata/pg_cron#ensuring-pg_cron-can-start-jobs) for more information).
Setting ``cron.use_background_workers`` to ``on`` will make pg_cron use background workers instead of opening connections;
however, ``max_worker_processes`` might need to be increased for more jobs to be run.

Once finished modifying ``postgresql.conf``,
**restart PostgreSQL** for your changes to take effect.

### Step #5: Create Database & Roles

Login to PostgreSQL as the 'postgres' user and run the following in order:

```sh
CREATE USER <your admin username> WITH SUPERUSER PASSWORD '<your admin password>';
CREATE USER <your user username> WITH PASSWORD '<your user password>';
CREATE DATABASE <your database> WITH OWNER <your admin username>;
```

The SQL generated by the initialization script is tailored to the arguments you provided;
as a result, you must first create the roles in the database (as well as the database itself) that the script will be referring to.

Once done, logout of PostgreSQL as the 'postgres' user.

### Step #6: Run Generated SQL Script

With everything prepped and ready,
you can now run the SQL that will create everything in the ProxiPoll database.
While in the ``proxipoll/`` directory (again, same directory this README is in),
run the following in a normal terminal:

```sh
psql postgresql://<your admin username>:<your admin password>@<your database host>:<your database port>/<your database> -f ./database/procedures/initialize_database.sql
```

For example, using the same values as the example in **Step #3**, your command should look something like this:

```sh
psql postgresql://bigman:bigsecret@localhost:5432/bigdata -f ./database/procedures/initialize_database.sql
```

After this, your ProxiPoll frontend, backend, and database should all be initialized and ready for use!

## Usage

TODO
