//server-core
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

configurations {
	compileOnly {
		extendsFrom(configurations.annotationProcessor.get())
    }
}

dependencies {
	implementation(kotlin("stdlib"))
	testImplementation("org.junit.jupiter:junit-jupiter-api:5.8.2")
	testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine")	
}

tasks.withType<org.jetbrains.kotlin.gradle.tasks.KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "1.8"
     }
}

tasks.withType<Test> {
	useJUnitPlatform()
}

var path = ext.get("buildDir").toString().plus("/").plus(ext.get("profile").toString());

sourceSets {
	main {
		resources {
			srcDirs(path)
			}
		}
	}
