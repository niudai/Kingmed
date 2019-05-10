mvnw clean
npm build
mvnw -Pdev-prod -Dmaven.test.skip=true package
