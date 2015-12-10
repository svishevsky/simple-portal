package com.svishevsky

import java.util.concurrent.TimeUnit
import java.security.MessageDigest

import akka.actor.Actor
import spray.routing._
import spray.http._
import spray.httpx._
import spray.json._
import MediaTypes._
import JWTTool._

class PortalServiceActor extends Actor with PortalService {
  def actorRefFactory = context
  def receive = runRoute(myRoute)
}

case class UserLogin(username: String, password: String)
case class Redirect(url: String)

object PortalJsonSupport extends DefaultJsonProtocol with SprayJsonSupport {
  implicit val UserFormats = jsonFormat2(UserLogin)
  implicit val RedirectFormats = jsonFormat1(Redirect)
}

import PortalJsonSupport._

trait PortalService extends HttpService {
  private val tokenCookieName = "sessionToken"
  var users = scala.collection.mutable.Map[String, String]()

  def registerNewUser(user: UserLogin): Boolean = {
    if (!users.contains(user.username)) {
      users.put(user.username, md5Hash(user.password))
      true
    } else {
      false
    }
  }

  def checkUser(user: UserLogin): Boolean = {
    users.contains(user.username) && users.get(user.username).get.equals(md5Hash(user.password))
  }

  def md5Hash(text: String): String = MessageDigest.getInstance("MD5").digest(text.getBytes()).map("%02x".format(_)).foldLeft("")(_ + _)

  val auth: Directive1[UserLogin] =
    entity(as[UserLogin]) flatMap { user =>
      if (checkUser(user)) provide(user) else reject(AuthorizationFailedRejection)
    }

  val extractJwsFromCookie: Directive1[JWTClaims] =
    optionalCookie(tokenCookieName) flatMap { tokenCookie =>
      tokenCookie match {
        case Some(ck) => if (isValid(ck.content)) provide(parse(ck.content)) else reject(AuthorizationFailedRejection)
        case None => reject(AuthorizationFailedRejection)
      }
    }

  val extractJwsOrRedirect: Directive1[JWTClaims] =
    optionalCookie(tokenCookieName) flatMap { tokenCookie =>
      tokenCookie match {
        case Some(ck) =>
          if (isValid(ck.content)) provide(parse(ck.content)) else redirect("/", StatusCodes.SeeOther)
        case None => redirect("/", StatusCodes.SeeOther)
      }
    }

  val redirectToIndexIfLogined: Directive1[String] =
    optionalCookie(tokenCookieName) flatMap { tokenCookie =>
      tokenCookie match {
        case Some(ck) =>
          if (isValid(ck.content)) provide("/index") else complete(html.login().toString)
        case None => complete(html.login().toString)
      }
    }

  val myRoute =
      pathSingleSlash {
        get {
          respondWithMediaType(`text/html`) {
            redirectToIndexIfLogined { path =>
              redirect(path, StatusCodes.SeeOther)
            }
          }
        }
      } ~ path("index") {
        get {
          extractJwsOrRedirect { claims =>
            respondWithMediaType(`text/html`) {
              complete(html.index().toString)
            }
          }
        }
      } ~ path("registration") {
        post {
          entity(as[UserLogin]) { userLogin =>
            respondWithMediaType(`application/json`) {
              //TODO
              complete(if (registerNewUser(userLogin)) StatusCodes.OK else StatusCodes.Forbidden)
            }
          }
        }
      } ~ path("login") {
        post {
          auth { user =>
            setCookie(HttpCookie(tokenCookieName, createToken1(JWTClaims(user.username, user.username, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(2))))) {
              respondWithMediaType(`application/json`) {
                complete(Redirect("/index"))
              }
            }
          }
        }
      } ~ path("logout") {
        get {
          deleteCookie(tokenCookieName) {
            redirect("/", StatusCodes.SeeOther)
          }
        }
      }
}

