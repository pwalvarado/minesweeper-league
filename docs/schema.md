# Schema Information

## users

| column name | data type | details |
-------------------------------------
| id          | integer   | not null, primary key |
| username    | string    | not null, unique |
| password_digest | string | not null |
| email       | string    | unique  |
| session_token | string | not null, unique |

## leaderboard

| column name | data type | details |
-------------------------------------
| ranking     | integer | not null |
| user_id     | integer | foreign key (references users)|
| time        | integer | not null |
| name        | string  | not null |
