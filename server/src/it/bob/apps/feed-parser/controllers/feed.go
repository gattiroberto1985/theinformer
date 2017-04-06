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

    // External additional libraries
    "gopkg.in/mgo.v2"
    //"gopkg.in/mgo.v2/bson"
    "github.com/julienschmidt/httprouter"
    "github.com/romana/rlog"

    // Application packages
    "it/bob/apps/feed-parser/models"
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
    var logprefix string = " [ GET /rest/projects ] "
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
        feed.UpdateFeed(fc.session);
        /*rlog.Info(logprefix + " |-- Managing feed '" + feed.Title + "' . . .")
        // Filling feedHeader . . .
        var feedHeader models.FeedHeader
        feedHeader.Title = feed.Title
        feedHeader.Url   = feed.Url
        feedDatas, err := http.Get( feedHeader.Url )
        if err != nil {
    		rlog.Error("Error in calling url: ", err)
    		return
    	}
        var channelData models.RssChannel
    	bs, err := ioutil.ReadAll(feedDatas.Body)
    	xml.Unmarshal(bs, &channelData)
    	for _, article := range channelData.Articles {
            // check if article.PublishDate > feed.LastUpdated
    		fmt.Println(logprefix + " |-- article identified: TITLE: " + article.Title + " -- URL: " + article.GUID + ", registering content . . .")
    		articlePage, err := http.Get( item.GUID )
    		if ( err != nil ) {
    			fmt.Println("     --> ERROR getting article: ", err )
    			continue
    		}
            article.Content, err = string( ioutil.ReadAll(articlePage.Body) )
            article.Rate = 0
            //article.FeedId = feed.Id
            fc.session.DB("theinformer").C("articles").Insert( article )*/
    	}

    //    pj, _ := json.Marshal(projects)
    responseMessage, _ := json.Marshal(models.ResponseMessage{HttpCode: 200, Message: "Projects retreived!", Body: responseBody })
    response.Header().Set("Content-Type", "application/json")
    response.WriteHeader(200)
    fmt.Fprintf(response, "%s", responseMessage)
}
