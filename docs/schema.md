# Schema Information

## users

| column name | data type | details |
|-------------|-----------|---------|
| id          | integer   | not null, primary key |
| username    | string    | not null, unique |
| password_digest | string | not null |
| email       | string    | unique  |
| session_token | string | not null, unique |

## leaders

| column name | data type | details |
|-------------|-----------|---------|
| user_id     | integer | foreign key (references users) |
| name        | string  | not null |
| time        | integer | not null, indexed |
