<ul>
<% _.each(feeds, function(feed){ %>
        <li>
            <!-- Feed title -->
            <%= feed.get('title') %>
               <span class="pull-right">
                   <span class="badge">
                       5 <!-- <%= feed.get('unread') %> -->
                   </span>
                   <button class="glyphicons glyphicons-refresh" />
                   <button class="glyphicons glyphicons-delete" />
               </span>
        </li>
        <% }); %>
</ul>
