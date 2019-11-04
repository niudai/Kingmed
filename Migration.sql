Data Migration SQL Snippet:

update DISEASE_XI_AN a
set a.SUBSIDIARY_ID  = (select b.id from JHI_SUBSIDIARY b where b.name= a.subsidiary)
where exists
(select * from JHI_SUBSIDIARY b where b.name = a.subsidiary);




DROP DATABASE `db_name`;


ALTER TABLE `table` DROP COLUMN `col_name`;

update DISEASE_MAP a
set a.DISEASE_BRANCH_ID = 35
where
a.id = 39;

update DISEASE_XI_AN a
set a.CONCOURSE_ID = (select b.id from JHI_CONCOURSE b where b.name= '感染')
where
( a.PROJECT_CONCOURSE = '微生物室'
OR a.PROJECT_CONCOURSE = '呼吸道病毒诊断研发中心');

update DISEASE_XI_AN a
set a.CONCOURSE_ID = (select b.id from JHI_CONCOURSE b where b.name= '遗传')
where a.PROJECT_CONCOURSE = '分字遗传室';

update DISEASE_XI_AN a
set a.CONCOURSE_ID = (select b.id from JHI_CONCOURSE b where b.name= '病理')
where
( a.PROJECT_CONCOURSE = '肾脏病理室'
OR a.PROJECT_CONCOURSE = '组织病理室'
OR a.PROJECT_CONCOURSE = '免疫组化室'
OR a.PROJECT_CONCOURSE = '细胞病理室'
OR a.PROJECT_CONCOURSE = '肾脏病理室/组织病理');

update DISEASE_XI_AN a
set a.CONCOURSE_ID = (select b.id from JHI_CONCOURSE b where b.name= '血液')
where a.PROJECT_CONCOURSE = '血液病理室';

update DISEASE_XI_AN a
set a.CONCOURSE_ID = (select b.id from JHI_CONCOURSE b where b.name= '卫检')
where a.PROJECT_CONCOURSE = '卫检';

SELECT * FROM DISEASE_XI_AN  WHERE project_concourse = '血液病理室';


-- 集团营销运 2
-- 各子公司自检项目清单 33
-- 各子公司自检项目清单 34

-- 地图板块迁移

update DISEASE_BRANCH  set DISEASE_PARTITION_ID = 1 where id =

select linkcards0_.disease_map_id as disease_6_25_1_,
linkcards0_.id as id1_25_1_, linkcards0_.id as id1_25_0_,
linkcards0_.article_name as article_2_25_0_, linkcards0_.article_url
 as article_3_25_0_, linkcards0_.image_url as image_ur4_25_0_,
 linkcards0_.sub_title as sub_titl5_25_0_ from link_card linkcards0_
 where linkcards0_.disease_map_id=?

 Hibernate: select diseasemap0_.disease_map_id as disease_7_3_2_,
 diseasemap0_.id as id1_3_2_, diseasemap0_.id as id1_3_1_,
 diseasemap0_.description as descript2_3_1_, diseasemap0_.name
 as name3_3_1_, diseasemap0_.disease_branch_id as disease_6_3_1_,
 diseasemap0_.disease_map_id as disease_7_3_1_,
 diseasemap0_.subsidiary as subsidia4_3_1_, diseasemap0_.type
 as type5_3_1_, diseasebra1_.id as id1_1_0_, diseasebra1_.description
 as descript2_1_0_, diseasebra1_.disease_partition_id
 as disease_3_1_0_, diseasebra1_.name
 as name4_1_0_, diseasebra1_.subsidiary
 as subsidia5_1_0_, diseasebra1_.type
 as type6_1_0_ from disease_map diseasemap0_
 left outer join disease_branch diseasebra1_
 on diseasemap0_.disease_branch_id=diseasebra1_.id
 where diseasemap0_.disease_map_id=?

select linkcards0_.disease_branch_id as disease_8_25_1_,
linkcards0_.id as id1_25_1_,
linkcards0_.id as id1_25_0_,
linkcards0_.article_name as article_2_25_0_,
linkcards0_.article_url as article_3_25_0_,
linkcards0_.image_url as image_ur4_25_0_,
linkcards0_.sub_title as sub_titl5_25_0_
from link_card linkcards0_ where linkcards0_.disease_branch_id=?


-- 二级:

Hibernate: select linkcards0_.disease_branch_id as disease_8_25_1_,
linkcards0_.id as id1_25_1_,
linkcards0_.id as id1_25_0_,
linkcards0_.article_name as article_2_25_0_,
linkcards0_.article_url as article_3_25_0_,
linkcards0_.image_url as image_ur4_25_0_,
linkcards0_.sub_title as sub_titl5_25_0_
from link_card linkcards0_ where linkcards0_.disease_branch_id=?

Hibernate: select linkcards0_.disease_map_id as disease_6_25_1_,
linkcards0_.id as id1_25_1_,
linkcards0_.id as id1_25_0_,
linkcards0_.article_name as article_2_25_0_,
linkcards0_.article_url as article_3_25_0_,
linkcards0_.image_url as image_ur4_25_0_,
linkcards0_.sub_title as sub_titl5_25_0_
from link_card linkcards0_ where linkcards0_.disease_map_id in (?, ?)

Hibernate: select diseasemap0_.disease_map_id as disease_7_3_2_,
diseasemap0_.id as id1_3_2_,
diseasemap0_.id as id1_3_1_,
diseasemap0_.description as descript2_3_1_,
diseasemap0_.name as name3_3_1_,
diseasemap0_.disease_branch_id as disease_6_3_1_,
diseasemap0_.disease_map_id as disease_7_3_1_,
diseasemap0_.subsidiary as subsidia4_3_1_,
diseasemap0_.type as type5_3_1_,
diseasebra1_.id as id1_1_0_,
diseasebra1_.description as descript2_1_0_,
diseasebra1_.disease_partition_id as disease_3_1_0_,
diseasebra1_.name as name4_1_0_,
diseasebra1_.subsidiary as subsidia5_1_0_,
diseasebra1_.type as type6_1_0_ from disease_map diseasemap0_
left outer join disease_branch diseasebra1_
on diseasemap0_.disease_branch_id=diseasebra1_.id
where diseasemap0_.disease_map_id in (?, ?)
