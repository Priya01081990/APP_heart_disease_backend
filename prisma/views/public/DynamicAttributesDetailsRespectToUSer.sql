SELECT
  da.id,
  da.name,
  da.display_name,
  dafv.id AS field_id,
  dafv.choices AS field_choice,
  dasv.id AS answer_id,
  dasv.answer,
  u.id AS user_id,
  u.name AS user_name,
  m.id AS module_id,
  m.display_name AS module_display_name
FROM
  (
    (
      (
        (
          dynamic_attributes da FULL
          JOIN dynamic_attributes_field_values dafv ON ((dafv.dynamic_attributes_id = da.id))
        )
        JOIN dynamic_attributes_selected_values dasv ON ((dasv.dynamic_attributes_id = da.id))
      )
      JOIN users u ON ((u.id = da.user_id))
    )
    JOIN module m ON ((m.id = da.module_id))
  );