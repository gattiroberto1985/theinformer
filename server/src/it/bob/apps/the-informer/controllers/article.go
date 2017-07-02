package controllers

import (
    // System standard library
    "encoding/json"
    //"encoding/xml"
    "fmt"
    "net/http"
    //"strings"

    // External additional libraries
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
    "github.com/julienschmidt/httprouter"
    "github.com/romana/rlog"

    // Application packages
    "it/bob/apps/the-informer/models"
)


type ArticleController struct {
    session *mgo.Session
 }

// NewRssFeedController is a go function which returns a pointer to RssFeedController
func NewArticleController(s *mgo.Session) *ArticleController {
    return &ArticleController{s}
}

func (ac ArticleController) GetArticlesHeaders(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
    var fId string = params.ByName( "fId")
    var logprefix string = " [ GET /rest/feeds/:fId/articles ] "
    rlog.Info(logprefix + "Request for all articles in feed with id '" + fId + "' . . . ")
    var articles []models.ArticleHeader
    err := ac.session.DB("theinformer").C("articles").Find( bson.M{ "feedId": bson.ObjectIdHex(fId) }  ).All(&articles)
    if ( err != nil ) {
        // TODO: manage the exception!
        rlog.Error( "Error on retreiving articles!", err)
        return
    }
    var responseBody []models.ArticleHeader
    for _, article := range articles {
        responseBody = append( responseBody, article )
    }

    //    pj, _ := json.Marshal(projects)
    responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 200, Message: "Articles retreived!", Body: responseBody })
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    fmt.Fprintf(response, "%s", responseMessage)
}

func (ac ArticleController) GetArticle(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
    var aId string = params.ByName( "aId" )
    var logprefix string = " [ GET /rest/feeds/:fId/articles/:aId/ ] "
    rlog.Info(logprefix + "Request for  article with id '" + aId + "' . . . ")
    var article models.Article
    err := ac.session.DB("theinformer").C("articles").Find( bson.M{ "_id": bson.ObjectIdHex(aId) }  ).One(&article)
    if ( err != nil ) {
        // TODO: manage the exception!
        rlog.Error( "Error on retreiving article with id '" + aId + "'!", err)
        return
    }
    var responseBody []models.Article
    responseBody = append( responseBody, article)

    //    pj, _ := json.Marshal(projects)
    responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 200, Message: "Articles retreived!", Body: responseBody })
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    fmt.Fprintf(response, "%s", responseMessage)
}
