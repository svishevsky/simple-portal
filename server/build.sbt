organization	:= "com.svishevsky"
name		:= "simple-portal-server"
version		:= "1.0"

scalaVersion	:= "2.11.7"

scalacOptions := Seq("-unchecked", "-deprecation", "-encoding", "utf8")

resolvers ++= Seq(
  "spray repo" at "http://repo.spray.io/"
)

libraryDependencies ++= Seq(
  "io.spray"		%%	"spray-servlet"	%	"1.3.3",
  "io.spray"		%%	"spray-routing"	%	"1.3.3",
  "io.spray"		%%	"spray-json"	%	"1.3.2",
  "com.typesafe.akka"	%%	"akka-actor"	%	"2.4.1"
)

enablePlugins(TomcatPlugin)
containerLibs in Tomcat := Seq("com.github.jsimone" % "webapp-runner" % "8.0.23.0" intransitive())
containerMain in Tomcat := "webapp.runner.launch.Main"
containerPort := 9090

lazy val root = (project in file(".")).enablePlugins(SbtTwirl)
