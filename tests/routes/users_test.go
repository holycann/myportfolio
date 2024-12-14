package tests

import (
	"apiserver/models"
	"apiserver/service/user"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
)

func TestUserServiceHandler(t *testing.T) {
	userStore := &mockUserStore{}
	handler := user.NewHandler(userStore)

	t.Run("Should Fail If The User Payload Is Invalid", func(t *testing.T) {
		payload := models.RegisterUserPayload{
			Fullname: "Holycan",
			Username: "holycan",
			Phone:    "rama",
			Email:    "invalid",
			Password: "12345678!",
		}
		marshalled, _ := json.Marshal(payload)

		req, err := http.NewRequest(http.MethodPost, "/register", bytes.NewBuffer(marshalled))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		router := mux.NewRouter()

		router.HandleFunc("/register", handler.HandleRegister)
		router.ServeHTTP(rr, req)

		if rr.Code != http.StatusBadRequest {
			t.Errorf("Expected status code %d, got %d", http.StatusBadRequest, rr.Code)
		}
	})
	t.Run("Should Correct If The User Payload Is Valid", func(t *testing.T) {
		payload := models.RegisterUserPayload{
			Fullname: "Holycan",
			Username: "holycan",
			Email:    "valid@mail.com",
			Phone:    "11111111111",
			Password: "12345678!",
		}
		marshalled, _ := json.Marshal(payload)

		req, err := http.NewRequest(http.MethodPost, "/register", bytes.NewBuffer(marshalled))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		router := mux.NewRouter()

		router.HandleFunc("/register", handler.HandleRegister)
		router.ServeHTTP(rr, req)

		if rr.Code != http.StatusCreated {
			t.Errorf("Expected status code %d, got %d", http.StatusCreated, rr.Code)
		}
	})

}

type mockUserStore struct{}

func (m *mockUserStore) GetUserByUsername(username string) (*models.User, error) {
	return nil, nil
}

func (m *mockUserStore) GetUserByID(id int) (*models.User, error) {
	return nil, nil
}

func (m *mockUserStore) CreateUser(*models.User) error {
	return nil
}
