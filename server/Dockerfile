
# Start from a Debian image with the latest version of Go installed
# and a workspace (GOPATH) configured at /go.
FROM golang:1.8

# Copy the local package files to the container's workspace.
# Working on /go/ directory, adding sources
ADD src/ src
# Adding client files . . .
#ADD ../client/publish/ client/publish

# INSTALLING GO DEPENDENCIES
RUN go get github.com/julienschmidt/httprouter
RUN go get github.com/romana/rlog
RUN go get gopkg.in/mgo.v2
RUN go get github.com/mauidude/go-readability
RUN go get github.com/rs/cors

# BUILDING AND INSTALLING APPLICATION
RUN go install it/bob/apps/the-informer
ENTRYPOINT /go/bin/the-informer

# Document that the service listens on port 8080.
EXPOSE 3000
