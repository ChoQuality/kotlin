package com.example.kotlin

import com.example.kotlin.job.Job0
import com.example.kotlin.yml.Task
import lombok.extern.slf4j.Slf4j
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.beans.factory.annotation.Qualifier
import org.springframework.context.annotation.Configuration
import org.springframework.scheduling.annotation.EnableScheduling


@Slf4j
@Configuration
@EnableScheduling
class Schedule (
   private val job0 : Job0
   ,private val taskConf : Config ){

   @Autowired
   constructor(@Qualifier("TaskConf") taskConf: Config):
           this(Job0(),taskConf)



}