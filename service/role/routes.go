package role

import (
	"apiserver/models"
	"apiserver/utils"
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type Handler struct {
	store models.RoleStore
}

func NewHandler(store models.RoleStore) *Handler {
	return &Handler{store: store}
}

func (h *Handler) RoleRoutes(router *mux.Router) {
	router.HandleFunc("/role/add", h.HandleCreate).Methods("POST")
}

func (h *Handler) HandleCreate(w http.ResponseWriter, r *http.Request) {
	var payload models.CreateRole
	if err := utils.ParseJSON(r, &payload); err != nil {
		fmt.Printf("error parsing json: %v\n", err)
		utils.WriteError(w, http.StatusBadRequest, err)
	}

	if err := utils.Validate.Struct(payload); err != nil {
		fmt.Printf("error validating payload: %v\n", err)
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("Invalid Payload %v", errors))
		return
	}

	_, err := h.store.GetRoleByName(payload.Name)
	if err == nil {
		fmt.Printf("error get role by name %s: %v\n", payload.Name, err)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("role name %s already exists", payload.Name))
		return
	}

	err = h.store.CreateRole(&models.Role{
		Name: payload.Name,
		Desc: payload.Desc,
	})
	if err != nil {
		fmt.Printf("error create role: %v\n", err)
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusCreated, nil)
}
