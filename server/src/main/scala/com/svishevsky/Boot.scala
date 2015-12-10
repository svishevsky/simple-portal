package com.svishevsky

import akka.actor.{Props, ActorSystem}
import spray.servlet.WebBoot

class Boot extends WebBoot {

  val system = ActorSystem("portal")

  val serviceActor = system.actorOf(Props[PortalServiceActor])
}

