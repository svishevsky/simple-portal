package com.svishevsky

import java.util.Base64;
import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import spray.httpx.SprayJsonSupport
import spray.json._

case class JWTHeader(alg: String, typ: String)
case class JWTClaims(sub: String, name: String, exp: Long)

object JWTJsonSupport extends DefaultJsonProtocol with SprayJsonSupport {
  implicit val JWTHeaderFormats = jsonFormat2(JWTHeader)
  implicit val JWTClaimsFormats = jsonFormat3(JWTClaims)
}

import JWTJsonSupport._

object JWTTool {
  val header = JWTHeader("HS256", "JWT")
  val secret = "portal secret"
  val sha256_HMAC = Mac.getInstance("HmacSHA256")
  sha256_HMAC.init(new SecretKeySpec(secret.getBytes(), "HmacSHA256"))

  def isValid(token: String): Boolean = {
    try {
      val splited = token.split('.')
      val hash = Base64.getUrlEncoder().encodeToString(sha256_HMAC.doFinal((splited(0) + "." + splited(1)).getBytes));
      if (hash.equals(splited(2))) new String(Base64.getUrlDecoder.decode(splited(1).getBytes)).parseJson.convertTo[JWTClaims].exp > System.currentTimeMillis() else false
    } catch {
      case t: Throwable => false
    }
  }
  
  def parse(token: String): JWTClaims = {
		  new String(Base64.getUrlDecoder.decode(token.split('.')(1).getBytes)).parseJson.convertTo[JWTClaims]
  }

  def createToken1(claims: JWTClaims): String = {
    val headerJson = header.toJson
    val header64 = Base64.getUrlEncoder().encodeToString(headerJson.toString().getBytes)
    val claims64 = Base64.getUrlEncoder().encodeToString(claims.toJson.toString().getBytes)
    val hash = Base64.getUrlEncoder().encodeToString(sha256_HMAC.doFinal((header64 + "." + claims64).getBytes));
    
    s"${header64}.${claims64}.${hash}"
  }
}