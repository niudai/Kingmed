call npm run build
call mvnw -Pdev-prod -Dmaven.test.skip=true package
copy target\Kingmed-0.2.9.jar C:\Users\Administrator\OneDrive\Kingmed\ApplicationJar\Kingmed-2.0.0.jar
