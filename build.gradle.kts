plugins {
     id("org.springframework.boot") version "2.7.0"
     id("io.spring.dependency-management") version "1.0.11.RELEASE"
     war
    kotlin("jvm") version "1.6.21"
    kotlin("plugin.spring") version "1.6.21"
}

allprojects {

    apply(plugin = "kotlin")
    apply(plugin = "java")
    apply(plugin = "war")
    apply(plugin = "kotlin-spring")
    apply(plugin = "io.spring.dependency-management")
    apply(plugin = "org.springframework.boot")

    dependencies {
        compileOnly("org.projectlombok:lombok:1.18.24")
        annotationProcessor("org.projectlombok:lombok")
    }
    repositories {
        mavenCentral()
        maven {
            url = uri("https://repo.clojars.org")
            name = "Clojars"
        }
    }
}

project(":api"){

    group = "com.example"
    version = "0.0.1-SNAPSHOT"

    ext.set("buildDir","buildDir")
    ext.set("profile","dev")
    ext.set("javaVersion",JavaVersion.VERSION_1_8)

    dependencies {
        implementation( fileTree("libs").include("*.jar"))
    }

}

project(":api-core"){

    ext.set("javaVersion",JavaVersion.VERSION_1_8)

    dependencies {
        implementation( fileTree("libs").include("*.jar"))
    }

}