package models;

import (
    "encoding/xml"
    "io/ioutil"
    "net/http"
    "time"

    "github.com/romana/rlog"
	"gopkg.in/mgo.v2/bson"
    "gopkg.in/mgo.v2"
    //"it/bob/apps/feed-parser/models"
)

type RssFeed struct {
    Id      bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
	Title   string        `json:"title"        bson:"title"`
	Url     string        `json:"url"          bson:"url"`
	LastUpd time.Time     `json:"lastUpdate"   bson:"lastUpdate"`
}

func ( rssFeed RssFeed ) UpdateFeed(session *mgo.Session) {
    rlog.Info("Updating feed '" + rssFeed.Title + "' (id: '" + rssFeed.Id.String() + "'). . . ")
    feedDatas, err := http.Get( rssFeed.Url )
    if err != nil {
        rlog.Error("Error in calling url: ", err)
        return
    }

    var channelData RssChannel
    rlog.Info("Reading response received by server . . . ")
    bs, err := ioutil.ReadAll(feedDatas.Body)
    rlog.Info("Unmarshaling response via xml declaration of RssChannel in object . . . ")
    xml.Unmarshal(bs, &channelData)
    rlog.Info("Looping through " + /*string ( len( channelData.Articles )) + */" articles and storing the content of the new ones . . . ")
    for _, articleXML := range channelData.Articles {
        var article Article = *( NewArticle(&articleXML) )
        //rlog.Info(article.ToString())
        if ( article.PublishDate.Before( rssFeed.LastUpd ) ) {
            rlog.Info("Article '" + article.Title + "' published before last feed update. No one said me to store it, so i won't do that!")
            continue
        }
        rlog.Info("Storing article " + article.String() + " . . . ")
        article.Save(session)
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
    session.DB("theinformer").C("feeds").Update(bson.M{ "_id": rssFeed.Id }, rssFeed )
}
