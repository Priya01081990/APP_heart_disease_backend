CREATE VIEW "DynamicAttributesDetailsRespectToUSer" AS
    select da.id, da.name, da.display_name, dafv.id as "field_id", dafv.choices as "field_choice",
    dasv.id as "answer_id", dasv.answer, u.id as "user_id", u."name" as "user_name",
    m.id as "module_id", m.display_name as "module_display_name"
    from dynamic_attributes da
    full outer join dynamic_attributes_field_values dafv on dafv.dynamic_attributes_id = da.id
    inner join dynamic_attributes_selected_values dasv on dasv.dynamic_attributes_id = da.id 
    inner join users u ON u.id = da.user_id 
    inner join module m on m.id = da.module_id 