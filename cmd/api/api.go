package api

import (
	"apiserver/service/role"
	"apiserver/service/user"
	"database/sql"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

type APIServer struct {
	addr string
	db   *sql.DB
}

func NewAPIServer(addr string, db *sql.DB) *APIServer {
	return &APIServer{
		addr: addr,
		db:   db,
	}
}

func (s *APIServer) Run() error {
	router := mux.NewRouter()
	subrouter := router.PathPrefix("/api/v1").Subrouter()

	userStore := user.NewStore(s.db)
	userHandler := user.NewHandler(userStore)
	userHandler.UserRoutes(subrouter)

	roleStore := role.NewStore(s.db)
	roleHandler := role.NewHandler(roleStore)
	roleHandler.RoleRoutes(subrouter)

	log.Print("Listening On Port ", s.addr)

	return http.ListenAndServe(s.addr, router)
}
