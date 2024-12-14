package user

import (
	"apiserver/config"
	"apiserver/models"
	"apiserver/service/auth"
	"apiserver/utils"
	"fmt"
	"net/http"

	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
)

type Handler struct {
	store models.UserStore
}

func NewHandler(store models.UserStore) *Handler {
	return &Handler{store: store}
}

func (h *Handler) UserRoutes(router *mux.Router) {
	router.HandleFunc("/login", h.HandleLogin).Methods("POST")
	router.HandleFunc("/register", h.HandleRegister).Methods("POST")
}

func (h *Handler) HandleLogin(w http.ResponseWriter, r *http.Request) {
	var payload models.LoginUserPayload
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

	u, err := h.store.GetUserByUsername(payload.Username)
	if err != nil {
		fmt.Printf("error get user by username: %v\n", err)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("Username Or Password Invalid", payload.Username))
		return
	}

	if !auth.ComparePassword(u.Password, []byte(payload.Password)) {
		fmt.Printf("error compare password: %v\n", err)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("Username Or Password Invalid"))
		return
	}

	token, err := auth.CreateJWT([]byte(config.Env.JWTSecret), u.ID)
	if err != nil {
		fmt.Printf("error create jwt: %v\n", err)
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusOK, map[string]string{
		"token": token,
	})

}

func (h *Handler) HandleRegister(w http.ResponseWriter, r *http.Request) {
	var payload models.RegisterUserPayload
	if err := utils.ParseJSON(r, &payload); err != nil {
		utils.WriteError(w, http.StatusBadRequest, err)
	}

	if err := utils.Validate.Struct(payload); err != nil {
		errors := err.(validator.ValidationErrors)
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("Invalid Payload %v", errors))
		return
	}

	_, err := h.store.GetUserByUsername(payload.Username)
	if err == nil {
		utils.WriteError(w, http.StatusBadRequest, fmt.Errorf("username %s already exists", payload.Username))
		return
	}

	hashPassword, err := auth.HashPassword(payload.Password)
	if err != nil {
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	err = h.store.CreateUser(&models.User{
		Username: payload.Username,
		Fullname: payload.Fullname,
		Phone:    payload.Phone,
		Email:    payload.Email,
		Password: hashPassword,
		RoleID:   payload.RoleID,
	})
	if err != nil {
		fmt.Printf("error create user: %v\n", err)
		utils.WriteError(w, http.StatusInternalServerError, err)
		return
	}

	utils.WriteJSON(w, http.StatusCreated, nil)
}
