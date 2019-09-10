Data Migration SQL Snippet:

update DISEASE_XI_AN a
set a.SUBSIDIARY_ID  = (select b.id from JHI_SUBSIDIARY b where b.name= a.subsidiary)
where exists
(select * from JHI_SUBSIDIARY b where b.name = a.subsidiary);

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
