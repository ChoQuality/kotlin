package com.example.kotlin.yml

import lombok.Getter
import lombok.Setter
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@Getter
@Setter
@ConstructorBinding
@ConfigurationProperties(prefix = "task")
class Task(
    private val schedulePoolSize : Int
    ,private val scheduleThreadNamePrefix : String
    ,private val cronJob0 : String
    ,private val prefixTablename : String
    ) {
}