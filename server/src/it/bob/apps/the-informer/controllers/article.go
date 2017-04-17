package controllers

import (
    // System standard library
    //"encoding/json"
    //"encoding/xml"
    //"fmt"
    //"net/http"
    //"strings"

    // External additional libraries
    "gopkg.in/mgo.v2"
    //"gopkg.in/mgo.v2/bson"
    //"github.com/julienschmidt/httprouter"
    //"github.com/romana/rlog"

    // Application packages
    //"it/bob/apps/the-informer/models"
)


type ArticleController struct {
    session *mgo.Session
 }

// NewRssFeedController is a go function which returns a pointer to RssFeedController
func NewArticleController(s *mgo.Session) *ArticleController {
    return &ArticleController{s}
}
