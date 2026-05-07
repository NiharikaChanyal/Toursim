FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app

COPY . .

RUN cd tourism-backend && mvn clean package -DskipTests

FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app

COPY --from=build /app/tourism-backend/target/*.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
