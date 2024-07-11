// src/schema.rs

table! {
    schedules (id) {
        id -> Uuid,
        title -> Varchar,
        description -> Nullable<Text>,
        date -> Timestamp,
        tag -> Nullable<Varchar>,
        created_at -> Timestamp,
        updated_at -> Timestamp,
    }
}
