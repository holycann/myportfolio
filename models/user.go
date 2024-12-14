package models

import "time"

type UserStore interface {
	GetUserByUsername(username string) (*User, error)
	GetUserByID(id int) (*User, error)
	CreateUser(user *User) error
}

type User struct {
	ID        int       `json:"id"`
	Username  string    `json:"username"`
	Fullname  string    `json:"fullname"`
	Phone     string    `json:"phone"`
	Email     string    `json:"email"`
	Password  string    `json:"password"`
	Gender    *string   `json:"gender"`
	Bio       *string   `json:"bio"`
	PictureID *int      `json:"picture_id"`
	RoleID    int       `json:"role_id"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type RegisterUserPayload struct {
	Fullname string `json:"fullname" validate:"required"`
	Username string `json:"username" validate:"required,min=3,max=30"`
	Email    string `json:"email" validate:"required,email"`
	Phone    string `json:"phone" validate:"required,number,min=10,max=20"`
	Password string `json:"password" validate:"required,min=8,max=32"`
	RoleID   int    `json:"role_id" validate:"required"`
}

type LoginUserPayload struct {
	Username string `json:"username" validate:"required,min=3,max=30"`
	Password string `json:"password" validate:"required,min=8,max=32"`
}
