package models;

import (
    "encoding/xml"
    "io/ioutil"
    "net/http"
    "time"

    "github.com/romana/rlog"
	"gopkg.in/mgo.v2/bson"
    "gopkg.in/mgo.v2"

    //"it/bob/apps/the-informer/constants"
)

type RssFeed struct {
    Id         bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
	Title      string        `json:"title"        bson:"title"`
	Url        string        `json:"url"          bson:"url"`
	LastUpd    time.Time     `json:"lastUpdate"   bson:"lastUpdate"`
    Unread     int           `json:"unread"       bson:"unread"`
    Categories []string      `json:"categories"   bson:"categories"`
}

// UpdateFeed scan the feed XML and store the new articles on the database
func ( rssFeed RssFeed ) UpdateFeed(session *mgo.Session) ( *FeedHeader, error ) {
    rlog.Info("Updating feed '" + rssFeed.Title + "' (id: '" + rssFeed.Id.String() + "'). . . ")
    feedDatas, err := http.Get( rssFeed.Url )
    if err != nil {
        rlog.Error("Error in calling url: ", err)
        return nil, err
    }
    var feedHeader FeedHeader
    feedHeader.Title = rssFeed.Title
    feedHeader.Url   = rssFeed.Url

    var headers []ArticleHeader

    ZERO_DATE, _ := time.Parse("Mon 02 Jan 2006 15:04:05", "Mon 01 Jan 0001 00:00:00")

    var channelData RssChannel
    rlog.Info("Reading response received by server . . . ")
    bs, err := ioutil.ReadAll(feedDatas.Body)
    rlog.Info("Unmarshaling response via xml declaration of RssChannel in object . . . ")
    xml.Unmarshal(bs, &channelData)
    rlog.Info("Looping through " + /*string ( len( channelData.Articles )) + */" articles and storing the content of the new ones . . . ")
    for _, articleXML := range channelData.Articles {
        var header ArticleHeader
        var article Article = *( NewArticle(&articleXML) )
        //rlog.Info(article.ToString())
        if ( article.PublishDate.Before( rssFeed.LastUpd ) ) {
            // Skipping article if publishdate > zero_date
            if ( ! article.PublishDate.Equal( ZERO_DATE ) ) {
                rlog.Info("Article '" + article.Title + "' published before last feed update. No one said me to store it, so i won't do that!")
                continue
            }
            // else i try the insert!
            rlog.Warn("Article publish date is empty, setting to current time!")
            article.PublishDate = time.Now()
        }
        article.FeedId = rssFeed.Id
        rlog.Info("Storing article " + article.String() + " . . . ")
        article.Id = bson.NewObjectId()
        article.Save(session)
        header.Date  = article.PublishDate
        header.Title = article.Title
        header.Id    = article.Id
        headers = append ( headers, header )
        /*articlePage, err := http.Get( article.GUID )
        if ( err != nil ) {
            rlog.Info("     --> ERROR getting article: ", err )
            continue
        }
        artStr, err := ioutil.ReadAll(articlePage.Body)
        article.Content = string( artStr )
        article.Rate = 0*/
        //article.FeedId = feed.Id

    }
    rssFeed.LastUpd = time.Now()
    rlog.Info("Registering last update time of feed to '" + rssFeed.LastUpd.String() + "'")
    feedHeader.ArticleHeaders = headers
    err = session.DB("theinformer").C("feeds").Update(bson.M{ "_id": rssFeed.Id }, rssFeed )
    return &feedHeader, err
}

// SaveFeed insert the feed into the database and proceed to his update
func ( rssFeed RssFeed ) UpsertFeed(session *mgo.Session) ( *FeedHeader, error ) {
    rlog.Info("Saving changes to feed '" + rssFeed.Title + ". . . ")
    err := session.DB("theinformer").C("feeds").Insert( rssFeed )
    if ( err != nil ) {
        // Manage error!
        rlog.Error("An error has occurred while inserting the feed", err )
        return nil, err
    }
    rlog.Info("Updating feed articles . . . ");
    return rssFeed.UpdateFeed(session)
}

func ( rssFeed RssFeed ) DeleteFeed( session *mgo.Session ) error {
    rlog.Info("Deleting feed '" + rssFeed.Title + "' (id: '" + rssFeed.Id.String() + "')")
    err := session.DB("theinformer").C("feeds").Remove(bson.M{ "_id": rssFeed.Id } )
    if ( err != nil ) {
        // Manage error!
        rlog.Error("An error has occurred while deleting the feed", err )
        return err
    }
    //rlog.Info("Updating feed articles . . . ");
    //rssFeed.UpdateFeed(session)
    return nil
}
