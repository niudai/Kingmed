call mvnw clean
npm run build
call mvnw -Pdev-prod -Dmaven.test.skip=true package
