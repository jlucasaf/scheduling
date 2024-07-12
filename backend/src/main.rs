// #[macro_use]
extern crate diesel;
extern crate dotenv;

use actix_web::{web, App, HttpServer};
use dotenv::dotenv;
// use std::env;
use crate::db::establish_connection;
use crate::routes::routes;

mod db;
mod schema;
mod routes;
mod user;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();
    // let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = establish_connection();

    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(pool.clone()))
            .configure(routes)
    })
    .bind("0.0.0.0:8080")?
    .run()
    .await
}