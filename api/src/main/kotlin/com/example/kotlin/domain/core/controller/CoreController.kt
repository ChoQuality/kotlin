package com.example.kotlin.domain.core.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.servlet.ModelAndView

@RequestMapping("","/")
class CoreController {

    @GetMapping("/root")
    fun init() : ModelAndView{

        return ModelAndView()
    }

}