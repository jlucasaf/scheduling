use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use dotenv::dotenv;
use std::env;

pub type Pool = r2d2::Pool<ConnectionManager<PgConnection>>;

pub fn establish_connection() -> Pool {
    dotenv().ok(); // Carregar variáveis de ambiente do arquivo .env

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL deve ser setada");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    r2d2::Pool::builder().build(manager).expect("Falha ao criar pool")
}
