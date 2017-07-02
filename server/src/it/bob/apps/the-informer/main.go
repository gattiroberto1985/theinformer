package main

import (
	//"encoding/xml"
	//"fmt"
	//"html/template"
	"flag"
	//"io"
	//"io/ioutil"
	//"log"
	"net/http"
	"net/url"
	//"os"
	//"time"

	// applicazione
	"it/bob/apps/the-informer/controllers"
	//"it/bob/apps/the-informer/models"

	// Terze parti
	//"github.com/tdewolff/minify"
	"github.com/julienschmidt/httprouter"
	"github.com/romana/rlog"
	"gopkg.in/mgo.v2"
    "github.com/rs/cors"

	//"it/bob/apps/the-informer/constants"
)


func getSession() *mgo.Session {
    // Connect to our local mongo
    s, err := mgo.Dial("mongodb://localhost")
	// docker mongodb container
	//s, err := mgo.Dial("mongodb://192.168.99.100:42001")
    // Check if connection error, is mongo running?
    if err != nil {
        panic(err)
    }
    return s
}

func main() {
    //rlog.SetConfFile("./log.config")
    rlog.Info("Starting theinformer server . . . ")

	// Instantiate a new router
    r := httprouter.New()

    // Get a UserController instance
    fc := controllers.NewFeedController   (getSession())
	ac := controllers.NewArticleController(getSession())

	rlog.Info("Defining http routing . . . ")
	// FEED ENDPOINTS
	// Feed insert
	//r.POST( "/rest/feeds"            , fc.InsertFeed )
	// Feeds getter
	//r.GET(  "/rest/feeds"            , fc.GetFeeds   )
	// Specific feed getter
	//r.GET(  "/rest/feeds/:fId"       , fc.GetFeed    )

	//r.POST("/rest/feeds/"           , fc.InsertFeed )
	//r.PUT ("/rest/feeds/:fId"       , fc.ModifyFeed )
	r.DELETE("/rest/feeds/:fId"     , fc.DeleteFeed )
	// Update specific feeds article
	r.PATCH("/rest/feeds/:fId"     , fc.UpdateFeeds)
	// Update all feeds article
	r.PATCH("/rest/feeds/", fc.UpdateFeeds)

	r.GET("/rest/feeds/", fc.GetFeeds )

	r.GET("/rest/feeds/:fId/articles/"    , ac.GetArticlesHeaders )
	r.GET("/rest/articles/:aId", ac.GetArticle )

	rlog.Info("Serving files . . .")
	proxyUrl, err := url.Parse("http://192.168.100.15:3128")
	if ( err != nil ) {
		rlog.Error("!!!!!!!!!!!!!!!!! Unable to set the proxy '" + proxyUrl.String() + "'!")
		return
	}

	//http.DefaultTransport = &http.Transport{Proxy: http.ProxyURL(proxyUrl)}

	clientTestDir := flag.String("d", "../client/src/templates/", "the directory of static file to host")
	r.ServeFiles("/static/*filepath", http.Dir(*clientTestDir))

    c := cors.New(cors.Options{
            AllowedOrigins: []string{"*"},
            AllowedMethods: []string{"GET", "POST", "DELETE", "PUT", "OPTIONS", "PATCH"},
    })

    rlog.Error( http.ListenAndServe(":3000", c.Handler(r)) )

}
