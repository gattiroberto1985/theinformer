var conn = new Mongo();

db = conn.getDB("theinformer");
db.createCollection("feeds");
db.createCollection("articles");

/*
Title   string    `json:"title"      bson:"title"`
Url     string    `json:"url"        bson:"url"`
LastUpd time.Time `json:"lastUpdate" bson:"lastUpdate"`
*/
db.feeds.insert( { title: "Motorsport (Tutti i feed)", url: "https://www.motorsport.com/rss/all/news/", lastUpd: new Date() } );
db.feeds.insert( { title: "Il Post (Tutti i feed)"   , url: "http://www.ilpost.it/feed/"              , lastUpd: new Date() } );
