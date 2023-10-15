FROM openjdk:17

WORKDIR /app

COPY target/backend2-0.0.1-SNAPSHOT.jar backend2-0.0.1-SNAPSHOT.jar

EXPOSE 7295

CMD ["java", "-jar", "backend2-0.0.1-SNAPSHOT.jar"]

