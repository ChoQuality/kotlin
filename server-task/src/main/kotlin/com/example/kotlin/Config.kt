package com.example.kotlin

import com.example.kotlin.yml.Task
import lombok.AllArgsConstructor
import lombok.Getter
import org.springframework.boot.context.properties.ConstructorBinding
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.stereotype.Component

@Getter
@AllArgsConstructor
@ConstructorBinding
@Component("TaskConf")
@EnableConfigurationProperties(
    Task::class
)
class Config (private val task: Task){
}