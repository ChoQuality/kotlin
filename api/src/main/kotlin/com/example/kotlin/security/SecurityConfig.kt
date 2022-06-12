package com.example.kotlin.security

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.ApplicationContext
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.authorization.AuthenticatedAuthorizationManager
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
import sun.tools.jconsole.Plotter
import javax.servlet.http.HttpServletRequest
import org.springframework.web.context.request.ServletRequestAttributes as ServletRequestAttributes1

@Configuration
@EnableWebSecurity
class SecurityConfig(
    private val http: HttpSecurity
    , private val authConf: AuthenticationConfiguration
    , private val servlet : HttpServletRequest
    , private val introspector : HandlerMappingIntrospector){

    @Autowired
    constructor(http: HttpSecurity,authConf: AuthenticationConfiguration,servlet : HttpServletRequest)
            : this(http,authConf,servlet,HandlerMappingIntrospector())

    @Bean
    fun authenticationManager() : AuthenticationManager {
        return this.authConf.authenticationManager
    }

    @Bean
    fun webAuthSecurityFilterChain(access : AuthorizationManager<RequestAuthorizationContext>): SecurityFilterChain{

        http.authorizeHttpRequests { auth ->
            auth
                .anyRequest().access(access)
        }

        return http.build()
    }

    fun requestMatcherAuthorizationManager() : AuthorizationManager<RequestAuthorizationContext>{
        var permitAll : RequestMatcher = AndRequestMatcher(
            MvcRequestMatcher(introspector, "/resources/**")
            ,MvcRequestMatcher(introspector, "/static/**")
        )
        var any : RequestMatcher = AnyRequestMatcher.INSTANCE

        var manager :AuthorizationManager<HttpServletRequest> =
            RequestMatcherDelegatingAuthorizationManager.builder()
                .add(permitAll, AuthorizationManager { authentication, `object` -> AuthorizationDecision(true) })
                .add(any, AuthenticatedAuthorizationManager())
                .build()

       var authorizationManager : AuthorizationManager<RequestAuthorizationContext>
      var attr : ServletRequestAttributes1 = 
			(ServletRequestAttributes1)RequestContextHolder.currentRequestAttributes();

       authorizationManager =  AuthorizationManager { authentication, a: RequestAuthorizationContext -> return@AuthorizationManager manager.check(/* authentication = */
           authentication::get) }
       return
    }

}



/*
        new AndRequestMatcher(
                new MvcRequestMatcher(introspector, "/resources/**"),
        new MvcRequestMatcher(introspector, "/signup"),
        new MvcRequestMatcher(introspector, "/about"));
*/

        /*RequestMatcher permitAll =
        new AndRequestMatcher(
                new MvcRequestMatcher(introspector, "/resources/**"),
        new MvcRequestMatcher(introspector, "/signup"),
        new MvcRequestMatcher(introspector, "/about"));*/
        RequestMatcher admin = new MvcRequestMatcher(introspector, "/admin/**");
        RequestMatcher db = new MvcRequestMatcher(introspector, "/db/**");
        RequestMatcher any = AnyRequestMatcher.INSTANCE;
        AuthorizationManager<HttpRequestServlet> manager = RequestMatcherDelegatingAuthorizationManager.builder()
            .add(permitAll, (context) -> new AuthorizationDecision(true))
        .add(admin, AuthorityAuthorizationManager.hasRole("ADMIN"))
            .add(db, AuthorityAuthorizationManager.hasRole("DBA"))
            .add(any, new AuthenticatedAuthorizationManager())
            .build();
        return (context) -> manager.check(context.getRequest());
    }

}

