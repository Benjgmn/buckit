from models import AccountIn, AccountOutWithHashedPassword, AccountCreationError
from queries.pool import pool
from typing import Optional


class DuplicateAccountError(ValueError):
    pass

class AccountQueries:
    def get(self, username: str) -> Optional[AccountOutWithHashedPassword]:
        try:
            with pool.connection() as conn:
                with conn.cursor() as cursor:
                    cursor.execute(
                        """
                        SELECT *
                        FROM accounts
                        WHERE username = %s
                        ORDER BY username;
                        """,
                        (username,),
                    )
                    result = cursor.fetchone()

                    if result is None:
                        return None

                    id, username, hashed_password = result
                    return AccountOutWithHashedPassword(id=str(id), username=username, hashed_password=hashed_password)

        except Exception as e:
            print(e)
            return None
        

    def create(self, account_in: AccountIn, hashed_password: str) -> AccountOutWithHashedPassword:
        account_in_dict = account_in.dict()

        if self.get(account_in_dict['username']) is not None:
            raise DuplicateAccountError

        account_in_dict['hashed_password'] = hashed_password
        del account_in_dict['password']

        connection = pool.getconn()
        try:
            with connection:
                with connection.cursor() as cursor:
                    cursor.execute(
                        """
                        INSERT INTO accounts (username, hashed_password)
                        VALUES (%s, %s)
                        RETURNING id;
                        """,
                        (account_in_dict['username'], account_in_dict['hashed_password']),
                    )
                    inserted_id = cursor.fetchone()[0]

            account_out = AccountOutWithHashedPassword(
                id=str(inserted_id),
                username=account_in_dict['username'],
                hashed_password=account_in_dict['hashed_password'],
            )
            return account_out

        except Exception as e:
            print(e)
            raise AccountCreationError

        finally:
            pool.putconn(connection)