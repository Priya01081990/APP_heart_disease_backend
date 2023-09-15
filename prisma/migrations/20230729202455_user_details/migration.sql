CREATE VIEW "UserInfoWithCustomAttributes" AS
    SELECT u.id, u.name as "user_name",u.type,u.email, u.ph_no, u.address, u.age, u.gender, da."name" as "dynamic_attribute_name", da.id as "dynamic_attribute_id", at2.id as "attribute_type_id", at2."name" as "attribute_type_name", m.id as "module_id", m.display_name  as "module_display_name" FROM users u 
    INNER JOIN dynamic_attributes da on u.id=da.user_id
    inner join attribute_types at2 on at2.id = da.attribute_type_id
    inner join module m on m.id = da.module_id