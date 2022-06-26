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
        annotationProcessor("org.projectlombok:lombok")
        implementation("org.springframework.boot:spring-boot-starter-security")
        implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
        implementation("org.springframework.boot:spring-boot-starter-web")
        implementation("org.springframework.boot:spring-boot-starter-web-services")
        implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
        implementation("org.jetbrains.kotlin:kotlin-reflect")
        implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
        implementation("org.thymeleaf.extras:thymeleaf-extras-springsecurity5")
        implementation("org.springframework.boot:spring-boot-starter-tomcat:2.7.0")
        annotationProcessor("org.springframework.boot:spring-boot-configuration-processor")
    }
    repositories {
        mavenCentral()
    }
    tasks.register("make-project-"+project.name){
        group = "ide";
        doLast {
            println("project-dir : " + project.projectDir)

            var dir_list : kotlin.collections.ArrayList<File> = ArrayList<File>()
            dir_list.add(project.projectDir)
            dir_list.add(File(project.projectDir,"buildDir"))
            dir_list.add(File(project.projectDir,"buildDir/dev"))
            dir_list.add(File(project.projectDir,"buildDir/prod"))
            dir_list.add(File(project.projectDir,"buildDir/stage"))
            dir_list.add(File(project.projectDir,"libs"))
            dir_list.add(File(project.projectDir,"src"))
            dir_list.add(File(project.projectDir,"src/main"))
            dir_list.add(File(project.projectDir,"src/main/kotlin"))
            dir_list.add(File(project.projectDir,"src/main/resources"))
            dir_list.add(File(project.projectDir,"src/test"))
            dir_list.add(File(project.projectDir,"src/test/kotlin"))
            dir_list.add(File(project.projectDir,"src/test/resources"))

            dir_list.forEach { file ->
                if (!file.exists()) {
                    file.mkdir();
                }
            }
            File(project.projectDir,"build.gradle.kts")
                .writeText("//" +  project.name
                        + "\n" + "import org.jetbrains.kotlin.gradle.tasks.KotlinCompile" + "\n"
                        + "\n" + "configurations {\n\tcompileOnly {\n\t\textendsFrom(configurations.annotationProcessor.get())\n    }\n}" + "\n"
                        + "\n" + "dependencies {\n\timplementation(kotlin(\"stdlib\"))\n\ttestImplementation(\"org.junit.jupiter:junit-jupiter-api:5.8.2\")\n\ttestRuntimeOnly(\"org.junit.jupiter:junit-jupiter-engine\")\t\n}" + "\n"
                        + "\n" + "tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {\n\tkotlinOptions {\n\t\tfreeCompilerArgs = listOf(\"-Xjsr305=strict\")\n\t\tjvmTarget = \"1.8\"\n     }\n}" + "\n"
                        + "\n" + "tasks.withType<Test> {\n\tuseJUnitPlatform()\n}" + "\n"
                        + "\n" + "var path = ext.get(\"buildDir\").toString().plus(\"/\").plus(ext.get(\"profile\").toString());" + "\n"
                        + "\n" + "sourceSets {\n\tmain {\n\t\tresources {\n\t\t\tsrcDirs(path)\n\t\t\t}\n\t\t}\n\t}" + "\n"
                )
            File(project.projectDir.toString().plus("/libs"),"ReadMe.txt").writeText("// Library 추가")
        }
    }

    ext.set("buildDir","buildDir")
    ext.set("profile","dev")
    ext.set("javaVersion",JavaVersion.VERSION_1_8)
    java.sourceCompatibility = ext.get("javaVersion") as JavaVersion
}

project(":server-core"){

    group = "com.example"
    version = "0.0.1-SNAPSHOT"
    dependencies {
        implementation( fileTree("libs").include("*.jar"))
        implementation( project(":server-security"))
        implementation( project(":server-trace"))
        implementation( project(":server-service"))
        implementation( project(":server-task"))
    }
}

project(":server-trace"){
    dependencies {
        implementation( fileTree("libs").include("*.jar"))
        implementation("com.madgag.spongycastle:prov:1.58.0.0")
    }
}

project(":server-security"){
    dependencies {
        implementation( fileTree("libs").include("*.jar"))
    }
}

project(":server-service"){
    dependencies {
        implementation( fileTree("libs").include("*.jar"))
    }
}

project(":server-task"){
    dependencies {
        implementation( fileTree("libs").include("*.jar"))
    }
}