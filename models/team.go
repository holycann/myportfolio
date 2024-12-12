package models

type Team struct {
	ID     string `json:"id"`
	Name   string `json:"name"`
	UserID string `json:"user_id"`
	Role   string `json:"role"`
}
