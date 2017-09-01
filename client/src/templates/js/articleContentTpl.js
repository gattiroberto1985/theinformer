// Filename: articleContentTpl
define([], function(){

    return {
        /*
        Id          bson.ObjectId `json:"id,omitempty"
        FeedId      bson.ObjectId `json:"feedId"
        Title       string        `json:"title"
        Link        string        `json:"url"
        PublishDate time.Time     `json:"publishDate"
        Author      string        `json:"author"
        IsRead      bool          `json:"isRead"
        Description template.HTML `json:"description"
        Rate        float32       `json:"rate"
        Content     string        `json:"content"
        Notes       []Note        `json:"notes"
        */
        templateStr: //'<div id="article-container">' +
        '    <h1> ' +
        '        <a href="<%= link %>"><%= title %></a> ' +
        '    </h1> ' +
        '    <p class="author"> Autore: <%= author %></p> ' +
        '    <p class="article-rate">Rating: <%= rate %> </p> ' +
        '    <p class="article-publish-date"> Data pubblicazione: <%= publishDate %> </p>' +
        '    <ul class="notes">' +
        // for note in notes <li class="note"><textarea><%= note %></textarea></li>
        '    </ul>' +
        '    <blockquote> <%= description %> </blockquote> ' +
        '    <section id="article-body-container"> ' +
        '        <%= content %> ' +
        '    </section> '
        //'</div> '
    }
});
