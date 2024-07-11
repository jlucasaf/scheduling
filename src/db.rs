// src/db.rs

use diesel::prelude::*;
use diesel::pg::PgConnection;
use dotenv::dotenv;
use std::env;
use uuid::Uuid;

use crate::models::{NewSchedule, Schedule};
use crate::schema::schedules;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}

pub fn create_schedule(conn: &PgConnection, new_schedule: NewSchedule) -> Schedule {
    use crate::schema::schedules::dsl::*;

    let new_id = Uuid::new_v4();
    let new_schedule = Schedule {
        id: new_id,
        title: new_schedule.title,
        description: new_schedule.description,
        date: new_schedule.date,
        tag: new_schedule.tag,
        created_at: chrono::Utc::now().naive_utc(),
        updated_at: chrono::Utc::now().naive_utc(),
    };

    diesel::insert_into(schedules)
        .values(&new_schedule)
        .get_result(conn)
        .expect("Error saving new schedule")
}

pub fn get_schedules(conn: &PgConnection) -> Vec<Schedule> {
    use crate::schema::schedules::dsl::*;

    schedules
        .load::<Schedule>(conn)
        .expect("Error loading schedules")
}

pub fn update_schedule(
    conn: &PgConnection,
    schedule_id: Uuid,
    updated_schedule: NewSchedule,
) -> Schedule {
    use crate::schema::schedules::dsl::*;

    diesel::update(schedules.find(schedule_id))
        .set((
            title.eq(updated_schedule.title),
            description.eq(updated_schedule.description),
            date.eq(updated_schedule.date),
            tag.eq(updated_schedule.tag),
            updated_at.eq(chrono::Utc::now().naive_utc()),
        ))
        .get_result(conn)
        .expect("Error updating schedule")
}

pub fn delete_schedule(conn: &PgConnection, schedule_id: Uuid) -> usize {
    use crate::schema::schedules::dsl::*;

    diesel::delete(schedules.find(schedule_id))
        .execute(conn)
        .expect("Error deleting schedule")
}
