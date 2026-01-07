package pl.lodz.uni.jesty

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class JestyApplication

fun main(args: Array<String>) {
	runApplication<JestyApplication>(*args)
}
