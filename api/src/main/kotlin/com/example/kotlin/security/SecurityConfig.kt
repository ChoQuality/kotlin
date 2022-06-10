package com.example.kotlin.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer
import org.springframework.security.web.SecurityFilterChain

@Configuration
@EnableWebSecurity
class SecurityConfig constructor(private val http: HttpSecurity){

    @Bean
    fun webAuthSecurityFilterChain(): SecurityFilterChain{
        http.authorizeHttpRequests()
            .antMatchers(HttpMethod.GET).authenticated()
            .antMatchers(HttpMethod.POST).authenticated()
            .antMatchers(HttpMethod.PUT).denyAll()
            .antMatchers(HttpMethod.DELETE).denyAll();
     return http.build()
    }

    

    @Bean
    fun webIgnoreWebSecurityCustomizer(): WebSecurityCustomizer{
        http.authorizeHttpRequests()
            .antMatchers(HttpMethod.GET).authenticated()
            .antMatchers(HttpMethod.POST).authenticated()
            .antMatchers(HttpMethod.PUT).denyAll()
            .antMatchers(HttpMethod.DELETE).denyAll();
        return http.build()
    }
}