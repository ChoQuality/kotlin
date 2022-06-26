package com.example.kotlin.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authorization.AuthenticatedAuthorizationManager
import org.springframework.security.authorization.AuthorityAuthorizationManager
import org.springframework.security.authorization.AuthorizationDecision
import org.springframework.security.authorization.AuthorizationManager
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.web.SecurityFilterChain
import org.springframework.security.web.access.intercept.RequestAuthorizationContext
import org.springframework.security.web.access.intercept.RequestMatcherDelegatingAuthorizationManager
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher
import org.springframework.security.web.util.matcher.AndRequestMatcher
import org.springframework.security.web.util.matcher.AnyRequestMatcher
import org.springframework.security.web.util.matcher.RequestMatcher
import org.springframework.web.servlet.handler.HandlerMappingIntrospector
import javax.servlet.http.HttpServletRequest

@Configuration
@EnableWebSecurity
class SecurityConfig(
     private val authConf: AuthenticationConfiguration
    , private val introspect : HandlerMappingIntrospector){

    @Autowired
    constructor(authConf: AuthenticationConfiguration)
            : this(authConf,HandlerMappingIntrospector())

    @Bean
    fun authenticationManager() : AuthenticationManager {
        return this.authConf.authenticationManager
    }

    @Bean
    fun webAuthSecurityFilterChain(http: HttpSecurity,access : AuthorizationManager<RequestAuthorizationContext>): SecurityFilterChain{

        http.authorizeHttpRequests { auth ->
            auth
                .anyRequest().access(access)
        }

        return http.build()
    }

    @Bean
    fun requestMatcherAuthorizationManager() : AuthorizationManager<RequestAuthorizationContext>{
        var permitAll : RequestMatcher = AndRequestMatcher(
            MvcRequestMatcher(introspect, "/resources/**")
            ,MvcRequestMatcher(introspect, "/static/**")
        )
        var db : RequestMatcher = MvcRequestMatcher(introspect, "/db/**")
        var any : RequestMatcher = AnyRequestMatcher.INSTANCE

        var manager :AuthorizationManager<HttpServletRequest> =
            RequestMatcherDelegatingAuthorizationManager.builder()
                .add(permitAll) { _, _ -> AuthorizationDecision(true) }
                .add(db, AuthorityAuthorizationManager.hasAnyRole("DBA"))
                .add(any, AuthenticatedAuthorizationManager())
                .build()

        return AuthorizationManager { authentication, req -> manager.check(authentication,req.request) }
    }

}

