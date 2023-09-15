SELECT
  u.id,
  u.name AS user_name,
  u.type,
  u.email,
  u.ph_no,
  u.address,
  u.age,
  u.gender,
  da.name AS dynamic_attribute_name,
  da.id AS dynamic_attribute_id,
  at2.id AS attribute_type_id,
  at2.name AS attribute_type_name,
  m.id AS module_id,
  m.display_name AS module_display_name
FROM
  (
    (
      (
        users u
        JOIN dynamic_attributes da ON ((u.id = da.user_id))
      )
      JOIN attribute_types at2 ON ((at2.id = da.attribute_type_id))
    )
    JOIN module m ON ((m.id = da.module_id))
  );