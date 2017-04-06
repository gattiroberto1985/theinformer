package main

import (
	//"encoding/xml"
	//"fmt"
	//"html/template"
	"io"
	//"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	//"time"

	// applicazione
	"it/bob/apps/feed-parser/controllers"
	//"it/bob/apps/feed-parser/models"

	// Terze parti
	//"github.com/tdewolff/minify"
	"github.com/julienschmidt/httprouter"
	"github.com/romana/rlog"
	"gopkg.in/mgo.v2"
	//"gopkg.in/mgo.v2/bson"

)


/*func HtmlMinify(html string) string {
    m := minify.New() //MinifierDefault()
    b := &bytes.Buffer{}
    if err := m.HTML(b, bytes.NewBufferString(html)); err != nil {
        panic(err)
    }
    return b.String()
}*/


/*type RssFeed struct {
	Title   string    `json:"title"      bson:"title"`
	Url     string    `json:"url"        bson:"url"`
	LastUpd time.Time `json:"lastUpdate" bson:"lastUpdate"`
}

type RssChannel struct {
	XMLName       xml.Name  `xml:"rss"`
	Title         string    `xml:"channel>title"         json:"title"       bson:"title"`
	Link          string    `xml:"channel>link"          json:"url"         bson:"url"`
	Description   string    `xml:"channel>description"   json:"description" bson:"description"`
	PubDate       string    `xml:"channel>pubDate"       json:"tmstUpd"     bson:"tmstUpd"`
	Feeds         []Feed    `xml:"channel>item"          json:"feeds"       bson:"feeds"`
}

type Feed struct {
    Title       string        `xml:"title"       json:"title"       bson:"title"      `
	Link        string        `xml:"link"        json:"url"         bson:"url"        `
	PublishDate string        `xml:"pubDate"     json:"publishDate" bson:"publishDate"`
	Author      string        `xml:"dc:creator"  json:"author"      bson:"author"     `
	GUID        string        `xml:"guid"        json:"guid"        bson:"guid"       `
	Description template.HTML `xml:"description" json:"description" bson:"description"`
	Rate        float32       `                  json:"rate"        bson:"rate"`
	Content     float32       `                  json:"rate"        bson:"rate"`

}*/


var (
    Trace   *log.Logger
    Info    *log.Logger
    Warning *log.Logger
    Error   *log.Logger
)

func Init(
    traceHandle io.Writer,
    infoHandle io.Writer,
    warningHandle io.Writer,
    errorHandle io.Writer) {

    Trace = log.New(traceHandle,
        "TRACE: ",
        log.Ldate|log.Ltime|log.Lshortfile)

    Info = log.New(infoHandle,
        "INFO: ",
        log.Ldate|log.Ltime|log.Lshortfile)

    Warning = log.New(warningHandle,
        "WARNING: ",
        log.Ldate|log.Ltime|log.Lshortfile)

    Error = log.New(errorHandle,
        "ERROR: ",
        log.Ldate|log.Ltime|log.Lshortfile)
}

func getSession() *mgo.Session {
    // Connect to our local mongo
    s, err := mgo.Dial("mongodb://localhost")

    // Check if connection error, is mongo running?
    if err != nil {
        panic(err)
    }
    return s
}


func main() {
	// Initializing log . . .
    Init(os.Stdout, os.Stdout, os.Stdout, os.Stderr)
    //Trace.Println("Trace message")
    //Info.Println("Info message")
    //Warning.Println("Warning message")
    //Error.Println("ERROR Message!")

    //rlog.SetConfFile("./log.config")
    rlog.Info("Starting theinformer server . . . ")

	// Instantiate a new router
    r := httprouter.New()

    // Get a UserController instance
    fc := controllers.NewFeedController   (getSession())
	//ac := controllers.NewArticleController(getSession())

	rlog.Info("Defining http routing . . . ")
	// FEED ENDPOINTS
	// Feed insert
	//r.POST( "/rest/feeds"            , fc.InsertFeed )
	// Feeds getter
	//r.GET(  "/rest/feeds"            , fc.GetFeeds   )
	// Specific feed getter
	//r.GET(  "/rest/feeds/:fId"       , fc.GetFeed    )
	// deleting feed
	//r.DELETE("/rest/feeds/:fId"      , fc.DeleteFeed )
	// Update all feeds
	r.PATCH("/rest/feeds/update"     , fc.UpdateFeeds)
	// Update specific feeds
	//r.PATCH("/rest/feeds/:fId/update", fc.UpdateFeed )
	rlog.Info("Serving files . . .")
	proxyUrl, err := url.Parse("http://192.168.100.15:3128")
	if ( err != nil ) {
		rlog.Error("!!!!!!!!!!!!!!!!! Unable to set the proxy!")
		return
	}
	http.DefaultTransport = &http.Transport{Proxy: http.ProxyURL(proxyUrl)}
    rlog.Error( http.ListenAndServe("www.theinformer.dev:3000", r) )


	// ARTICLES ENDPOINTS
	// Get articles by feed
	//r.GET( "/rest/feeds/:fId/articles/"     , ac.GetArticles )
	// Update article
	//r.PUT( "/rest/feeds/:fId/articles/:aId" , ac.UpdateArticle )
	// Get all articles
	//r.GET( "/rest/articles/:aId", ac.GetArticles  )
	//r.PUT( "/rest/articles/:aId", ac.UpdateArticle)

	// STORYBOARDS ENDPOINTS
	// TBD

	/*//xmlData, err := http.Get("http://www.ilpost.it/feed/")
	xmlData, err := http.Get("https://www.motorsport.com/rss/all/news/")

	if err != nil {
		rlog.Error("Error in calling url: ", err)
		return
	}

	var rssFeed RssChannel
	bs, err := ioutil.ReadAll(xmlData.Body)
	xml.Unmarshal(bs, &rssFeed)
	//bodyString := string(bs)

	//fmt.Println(RssChannel )
	for _, item := range rssFeed.Feeds {
		//fmt.Println("\t%s", "DATE: " + item.PublishDate + " -- " + "TITLE: " + item.Title + " -- URL: " + item.GUID)
		//fmt.Println("|--> Getting content . . ." )
		article, err := http.Get( item.GUID )
		if ( err != nil ) {
			fmt.Println("     --> ERROR: ", err )
			continue
		}
		artBody, err := ioutil.ReadAll(article.Body)
		//artByteStream := ioutil.ReadAll( artBody.Body )
		rlog.Info(" -----------------------" + "TITLE: " + item.Title + "-------------------------------- ")
		//fmt.Println( string ( artBody ) )
		minifiedHtml := string( artBody ))
		minifiedHtml := HtmlMinify(string( artBody ))
		rlog.Info(minifiedHtml)
		rlog.Info(" ------------------------------------------------------- ")
	}*/
}

/*func checkFeed( feed RssFeed ) {

}
*/
