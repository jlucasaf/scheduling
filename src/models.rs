use chrono::NaiveDateTime;
use serde::{Deserialize, Serialize};
use uuid::Uuid;

#[derive(Queryable, Serialize, Deserialize)]
pub struct Schedule {
    pub id: Uuid,
    pub title: String,
    pub description: Option<String>,
    pub date: NaiveDateTime,
    pub tag: Option<String>,
    pub created_at: NaiveDateTime,
    pub updated_at: NaiveDateTime,
}

#[derive(Insertable, Serialize, Deserialize)]
#[table_name = "schedules"]
pub struct NewSchedule {
    pub title: String,
    pub description: Option<String>,
    pub date: NaiveDateTime,
    pub tag: Option<String>,
}