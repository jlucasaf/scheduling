// src/main.rs

#[macro_use] extern crate rocket;

use rocket::serde::json::Json;
use uuid::Uuid;

mod db;
mod models;
mod schema;

use db::{establish_connection, create_schedule, get_schedules, update_schedule, delete_schedule};
use models::{NewSchedule, Schedule};

#[post("/schedules", format = "application/json", data = "<new_schedule>")]
fn create(new_schedule: Json<NewSchedule>) -> Json<Schedule> {
    let connection = establish_connection();
    Json(create_schedule(&connection, new_schedule.into_inner()))
}

#[get("/schedules")]
fn read() -> Json<Vec<Schedule>> {
    let connection = establish_connection();
    Json(get_schedules(&connection))
}

#[put("/schedules/<id>", format = "application/json", data = "<updated_schedule>")]
fn update(id: String, updated_schedule: Json<NewSchedule>) -> Json<Schedule> {
    let connection = establish_connection();
    let schedule_id = Uuid::parse_str(&id).unwrap();
    Json(update_schedule(&connection, schedule_id, updated_schedule.into_inner()))
}

#[delete("/schedules/<id>")]
fn delete(id: String) -> Json<usize> {
    let connection = establish_connection();
    let schedule_id = Uuid::parse_str(&id).unwrap();
    Json(delete_schedule(&connection, schedule_id))
}

#[launch]
fn rocket() -> _ {
    rocket::build().mount("/", routes![create, read, update, delete])
}
