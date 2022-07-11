package com.example.kotlin

import com.example.kotlin.job.Job0
import com.example.kotlin.yml.Task
import org.springframework.boot.context.properties.EnableConfigurationProperties
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling
import org.springframework.scheduling.annotation.Scheduled

@Configuration
@EnableScheduling
@EnableConfigurationProperties(
    Job0::class
)
class Schedule(
    private val job0 : Job0
    ) {


    @Scheduled(cron = "0 * * * * *")
    fun job0(){
        val execute: String = this.job0.execute(task = object : Task<String> {
            override fun execute(): String {
                return "ok"
            }
        })
    }
}

