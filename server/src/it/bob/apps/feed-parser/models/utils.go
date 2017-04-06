package models;

import (
	"encoding/xml"
	//"fmt"
	//"html/template"
	//"io"
	//"io/ioutil"
	//"log"
	//"net/http"
	//"os"
	//"time"

	// Terze parti
	//"github.com/tdewolff/minify"
	//"github.com/romana/rlog"
	//"gopkg.in/mgo.v2"
	//"gopkg.in/mgo.v2/bson"

)

/*type RssFeed struct {
	Title   string    `json:"title"      bson:"title"`
	Url     string    `json:"url"        bson:"url"`
	LastUpd time.Time `json:"lastUpdate" bson:"lastUpdate"`
}*/

type ResponseMessage struct {
  HttpCode int         `json:"httpcode" bson:"httpcode"`
  Message  string      `json:"message"  bson:"message"`
  Body     interface{} `json:"body"     bson:"body"`
}

type ArticleHeader struct {
	Id    string `json:"id"    bson:"id"`
	Title string `json:"title" bson:"title"`
}

type FeedHeader struct {
	Title          string          `json:"title"          bson:"title"`
	Url            string          `json:"url"            bson:"url"`
	ArticleHeaders []ArticleHeader `json:"articleHeaders" bson:"articleHeaders"`
}

type RssChannel struct {
	XMLName       xml.Name     `xml:"rss"`
	Title         string       `xml:"channel>title"         json:"title"       bson:"title"`
	Link          string       `xml:"channel>link"          json:"url"         bson:"url"`
	Description   string       `xml:"channel>description"   json:"description" bson:"description"`
	PubDate       string       `xml:"channel>pubDate"       json:"tmstUpd"     bson:"tmstUpd"`
	Articles      []ArticleXML `xml:"channel>item"          json:"articles"    bson:"articles"`
}

/*type Feed struct {
    Title       string        `xml:"title"       json:"title"       bson:"title"      `
	Link        string        `xml:"link"        json:"url"         bson:"url"        `
	PublishDate string        `xml:"pubDate"     json:"publishDate" bson:"publishDate"`
	Author      string        `xml:"dc:creator"  json:"author"      bson:"author"     `
	GUID        string        `xml:"guid"        json:"guid"        bson:"guid"       `
	Description template.HTML `xml:"description" json:"description" bson:"description"`
	Rate        float32       `                  json:"rate"        bson:"rate"`
	Content     float32       `                  json:"rate"        bson:"rate"`
}*/
