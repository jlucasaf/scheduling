use actix_web::{web, HttpResponse};
use crate::user::handlers::*;


async fn hello() -> HttpResponse {
    HttpResponse::Ok().body("Hello")
}

pub fn user_routes(cfg: &mut web::ServiceConfig) {
    cfg.service(
        web::scope("/users")
            .route("", web::post().to(create_user))
            .route("", web::get().to(hello))
            .route("/login", web::post().to(login_user))
    );
}
