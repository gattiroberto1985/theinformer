package controllers

import (
    // System standard library
    "encoding/json"
//    "encoding/xml"
    "fmt"
    //"io"
//	"io/ioutil"
    "net/http"
    //"strings"
    "time"

    // External additional libraries
    "gopkg.in/mgo.v2"
    "gopkg.in/mgo.v2/bson"
    "github.com/julienschmidt/httprouter"
    "github.com/romana/rlog"

    // Application packages
    "it/bob/apps/the-informer/models"
)


type FeedController struct {
    session *mgo.Session
 }

// NewRssFeedController is a go function which returns a pointer to RssFeedController
func NewFeedController(s *mgo.Session) *FeedController {
    return &FeedController{s}
}

// UpdateFeeds loops through the active feeds in the Feeds collection and update
// the articles in the feed. The output result is a json object structured as:
//
// {
//    [
//        {
//            "id"         : "<feedId>",
//            "title"      : "<feedTItle>",
//            "newArticles": [
//                { "id": "<aId>", "title": <"aTitle>" },
//                { "id": "<aId>", "title": <"aTitle>" },
//                { "id": "<aId>", "title": <"aTitle>" },
//                ...
//             ]
//         },
//         { ... }
//    ]
//}
func (fc FeedController) UpdateFeeds(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
    var logprefix string = " [ PATCH /rest/projects ] "
    rlog.Info(logprefix + "Request for all projects headers . . . ")
    var feeds []models.RssFeed
    err := fc.session.DB("theinformer").C("feeds").Find( /*bson.M{ }*/ nil)/*.Select( bson.M{ "tasks": 0 } )*//*.Sort("-DateLastUpdated")*/.All(&feeds)
    if err != nil {
        rlog.Error(logprefix + "  |-------> ERROR: problem retreiving the feeds!")
        responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 404, Message: ( "ERROR: problem on retreiving feeds!"), Body: err })
        response.Header().Set("Content-Type", "application/json")
        response.WriteHeader(200)
        fmt.Fprintf(response, "%s",responseMessage)
        return
    }
    var responseBody []models.FeedHeader
    for _, feed := range feeds {
        fh, fhErr := feed.UpdateFeed(fc.session);
        if ( fhErr != nil ) {
            rlog.Error( "Error on updating feed '" + feed.Title + "'!", err)
            continue
        }
        responseBody = append( responseBody, *fh )
    }

    //    pj, _ := json.Marshal(projects)
    responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 200, Message: "Projects retreived!", Body: responseBody })
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    fmt.Fprintf(response, "%s", responseMessage)
}

func (fc FeedController) UpsertFeed(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
    var logprefix string = " [ POST /rest/feeds ] "
    var feed models.RssFeed
    json.NewDecoder(request.Body).Decode(&feed)
    feed.Id = bson.NewObjectId()
    feed.LastUpd = time.Date(1970, 01, 01, 00, 00, 00, 00, time.UTC)
    rlog.Info(logprefix + "Upserting feed [ " + feed.Title + " ]. . . ")
    feed.UpsertFeed(fc.session)
}

func (fc FeedController) DeleteFeed(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
    var feedId string = params.ByName("fId")
    var feed models.RssFeed
    feed.Id = bson.ObjectIdHex(feedId)
    feed.DeleteFeed(fc.session)
}

func (fc FeedController) GetFeeds(response http.ResponseWriter, request *http.Request, params httprouter.Params) {
    var logprefix string = " [ GET /rest/feeds ] "
    rlog.Info(logprefix + "Request for all feeds . . . ")
    var feeds []models.RssFeed
    err := fc.session.DB("theinformer").C("feeds").Find( nil).All(&feeds)
    if ( err != nil ) {
        // TODO: manage the exception!
        rlog.Error( "Error on retreiving feeds!", err)
        return
    }
    var responseBody []models.RssFeed
    for _, feed := range feeds {
        responseBody = append( responseBody, feed )
    }

    //    pj, _ := json.Marshal(projects)
    responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 200, Message: "Feeds retreived!", Body: responseBody })
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    fmt.Fprintf(response, "%s", responseMessage)
}
