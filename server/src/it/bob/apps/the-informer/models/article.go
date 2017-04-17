package models;

import (
    "html/template"
    "io/ioutil"
    "net/http"
    "time"

    "github.com/romana/rlog"
    "gopkg.in/mgo.v2/bson"
    "gopkg.in/mgo.v2"
    "github.com/mauidude/go-readability"
)


type Note struct {
    // mongodb id field
    Date time.Time `json:"date" bson:"date"`
    Text string    `json:"text" bson:"text"`
}

type ArticleXML struct {
    // mongodb id field
    Title       string        `xml:"title"`
	//Link        string        `xml:"link"`
	PubDateStr  string        `xml:"pubDate"`
	Author      string        `xml:"dc:creator"`
	GUID        string        `xml:"guid"`
	Description template.HTML `xml:"description"`
}

type Article struct {
    Id          bson.ObjectId `json:"id,omitempty" bson:"_id,omitempty"`
    FeedId      bson.ObjectId `json:"feedId"      bson:"feedId"     `
    Title       string        `json:"title"       bson:"title"      `
    Link        string        `json:"url"         bson:"url"        `
    PublishDate time.Time     `json:"publishDate" bson:"publishDate"`
    Author      string        `json:"author"      bson:"author"     `
    IsRead      bool          `json:"isRead"      bson:"isRead"`
    //GUID        string        `json:"guid"        bson:"guid"       `
    Description template.HTML `json:"description" bson:"description"`
    Rate        float32       `json:"rate"        bson:"rate"`
    //Content     template.HTML `                  json:"content"     bson:"content"`
    Content     string        `json:"content"     bson:"content"`
    Notes       []Note        `json:"notes"       bson:"notes"`
}

func NewArticle(articleXML *ArticleXML) *Article {
    publishDate, _ := time.Parse("Mon, 02 Jan 2006 15:04:05 +0000", (*articleXML).PubDateStr)
    //rlog.Info("Publish date is: '" + ( *articleXML).PubDateStr + "' while formatted is '" + publishDate.Format("Mon 02 Jan 2006 15:04:05") + "'")
    return &Article{
        Title      : (*articleXML).Title,
        Author     : (*articleXML).Author,
        Link       : (*articleXML).GUID,
        Description: (*articleXML).Description,
        PublishDate: publishDate }
    /*(*article).Title       = (*articleXML).Title
    (*article).Author      = (*articleXML).Author
    (*article).Link        = (*articleXML).GUID
    (*article).Description = (*articleXML).Description
    (*article).PublishDate, _ = time.Parse(time.RFC3339, (*articleXML).PubDateStr)*/
}

func (article Article) String() string {
    return " Article: '" + article.Title + "', published on '" + article.PublishDate.Format("Mon 02 Jan 2006 15:04:05")  + "' by '" + article.Author + "'. . ."
}

func (article Article) Save(session *mgo.Session) {
    rlog.Info("Saving article . . .")
    articlePage, err := http.Get( article.Link )
    if ( err != nil ) {
        rlog.Error("     --> ERROR getting article: ", err )
        return
    }

    body, _ := ioutil.ReadAll(articlePage.Body)
    doc, err := readability.NewDocument( string ( body ) )
    if err != nil {
        rlog.Error(" Readability error", err)
    }
    article.Content = doc.Content()
    article.Rate = 0
    article.IsRead = false
    err = session.DB("theinformer").C("articles").Insert( article )
    if ( err != nil ) {
        rlog.Error("   --> ", err )
    }
}
