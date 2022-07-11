package com.example.kotlin.job

import com.example.kotlin.yml.Task
import org.springframework.boot.context.properties.ConfigurationProperties
import org.springframework.boot.context.properties.ConstructorBinding

@ConstructorBinding
@ConfigurationProperties(prefix = "job0")
class Job0(
    private val schedulePoolSize : String ,
    private val scheduleThreadNamePrefix : String ,
    private val scheduleTime : String ,
    private val prefixTablename : String
)/* : Task<Job0>*/ {

    fun <T> execute(task: Task<T>): T {
        val result = task.execute();
        return result;
    }


   /* override fun excute() {
        System.out.println(this.schedulePoolSize);
        System.out.println(this.scheduleThreadNamePrefix);
        System.out.println(this.scheduleTime);
        System.out.println(this.prefixTablename);
    }

    override fun create(t: Job0): Job0 {
        return t;
    }*/

}