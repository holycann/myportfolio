package models

type Users struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	Phone    string `json:"phone"`
	Email    string `json:"Email"`
	Password string `json:"password"`
	Bio      string `json:"bio"`
	Picture  string `json:"picture"`
}
