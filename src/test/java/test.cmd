REM PUT api/disease-guang-dongs/ : Update a Disease
curl -X PUT --header "Content-Type: application/json" -d '{"id":1,"prices":null,"name":"更新后数据","subsidiary":"西安","supplement":"dsf sd","testMethod":"sdf ","sample":"sdf ","roomPreservation":"erw","coldStoragePreservation":" 人","freezing":"4周","clinicalApplication":"qwessd ","tollStandard":"45","reportingTime":"78","remarks":"dfgd","chargeCode":"hkl","classification":"ghj","applicationUnitType":"gjk","series":"gjk","projectChangeNotification":"2019年03月01日实验室管理中心发〔2019〕1008号开展通知；","specialInspectionItems":"gjk","stopDeveloping":"正常开展","projectConcourse":"从是qw","testDepartment":"瓦尔彻底","suppliesSeries":"请问下"}' http://localhost:8080/api/disease-guang-dongs

REM POST api/disease-guang-dongs/ : Create a new Disease
curl -X POST --header "Content-Type: application/json" -d '{"prices": null, "name": "New Disease", "subsidiary": "XiAn" }' http://localhost:8080/api/disease-guang-dongs

REM PUT api/disease-guang-dongs/ : Update a Disease with price
curl -X PUT --header "Content-Type: application/json" -d '{"id":4,"prices": [{"tollStandard": "5", "reportingTime": "10day", "chargeCode": "2333"}],"name":"New Data"}' http://localhost:8080/api/disease-guang-dongs

REM PUT api/disease-guang-dongs/ : Update a Disease without price
curl -X PUT --header "Content-Type: application/json" -d '{"id":1,"prices": null,"name":"New Data"}' http://localhost:8080/api/disease-guang-dongs

REM POST api/disease-guang-dongs/addPrice/{id} : add a new price to a disease
curl -X POST --header "Content-Type: application/json" -d '{"tollStandard": "200元","reportingTime": "5day","chargeCode": "2333", "subsidiary": "XiAn"}' http://localhost:8080/api/disease-guang-dongs/addPrice/1

REM DELETE api/disease-guang-dongs/delete/{id} : delete a disease
curl -X DELETE http://localhost:8080/api/disease-guang-dongs/deletePrice/6

