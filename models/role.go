package models

type RoleStore interface {
	GetRoleByName(username string) (*Role, error)
	GetRoleByID(id int) (*Role, error)
	CreateRole(role *Role) error
}

type Role struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Desc string `json:"desc"`
}

type CreateRole struct {
	Name string `json:"name" validate:"required,min=3,max=30"`
	Desc string `json:"desc"`
}
