package tests

import (
	"apiserver/models"
	"apiserver/service/role"
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
)

func TestRoleServiceHandler(t *testing.T) {
	roleStore := &mockRoleStore{}
	handler := role.NewHandler(roleStore)

	t.Run("Should Fail If The Role Payload Is Invalid", func(t *testing.T) {
		payload := models.CreateRole{
			Name: "1",
			Desc: "",
		}
		marshalled, _ := json.Marshal(payload)

		req, err := http.NewRequest(http.MethodPost, "/role/add", bytes.NewBuffer(marshalled))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		router := mux.NewRouter()

		router.HandleFunc("/role/add", handler.HandleCreate)
		router.ServeHTTP(rr, req)

		if rr.Code != http.StatusBadRequest {
			t.Errorf("Expected status code %d, got %d", http.StatusBadRequest, rr.Code)
		}
	})

	t.Run("Should Success If The Role Payload Is Valid", func(t *testing.T) {
		payload := models.CreateRole{
			Name: "test",
			Desc: "test",
		}
		marshalled, _ := json.Marshal(payload)

		req, err := http.NewRequest(http.MethodPost, "/role/add", bytes.NewBuffer(marshalled))
		if err != nil {
			t.Fatal(err)
		}

		rr := httptest.NewRecorder()
		router := mux.NewRouter()

		router.HandleFunc("/role/add", handler.HandleCreate)
		router.ServeHTTP(rr, req)

		if rr.Code != http.StatusCreated {
			t.Errorf("Expected status code %d, got %d", http.StatusCreated, rr.Code)
		}
	})
}

type mockRoleStore struct{}

func (m *mockRoleStore) GetRoleByName(name string) (*models.Role, error) {
	return nil, nil
}

func (m *mockRoleStore) GetRoleByID(id int) (*models.Role, error) {
	return nil, nil
}

func (m *mockRoleStore) CreateRole(*models.Role) error {
	return nil
}
