package com.example.kotlin.core.log


class TraceState< out T : Exception>(val lvl : Int, val msg : String, val exception : T ) {

}