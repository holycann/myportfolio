package role

import (
	"apiserver/models"
	"database/sql"
	"fmt"
)

type Store struct {
	db *sql.DB
}

func NewStore(db *sql.DB) *Store {
	return &Store{
		db: db,
	}
}

func scanRowIntoRole(row *sql.Rows) (*models.Role, error) {
	role := new(models.Role)

	err := row.Scan(
		&role.ID,
		&role.Name,
		&role.Desc,
	)
	if err != nil {
		return nil, err
	}

	return role, nil
}

func (s *Store) GetRoleByName(name string) (*models.Role, error) {
	rows, err := s.db.Query("SELECT * FROM role WHERE name = ?", name)
	if err != nil {
		return nil, err
	}

	r := new(models.Role)
	for rows.Next() {
		r, err = scanRowIntoRole(rows)
		if err != nil {
			return nil, err
		}
	}

	if r.Name == "" {
		return nil, fmt.Errorf("Role not found")
	}

	return r, nil
}

func (s *Store) GetRoleByID(id int) (*models.Role, error) {
	rows, err := s.db.Query("SELECT * FROM role WHERE id = ?", id)
	if err != nil {
		return nil, err
	}

	r := new(models.Role)
	for rows.Next() {
		r, err = scanRowIntoRole(rows)
		if err != nil {
			return nil, err
		}
	}

	if r.ID == 0 {
		return nil, fmt.Errorf("Role not found")
	}

	return r, nil
}

func (s *Store) CreateRole(role *models.Role) error {
	_, err := s.db.Exec("INSERT INTO role (`name`, `desc`) VALUES (?, ?)", role.Name, role.Desc)
	if err != nil {
		return err
	}

	return nil
}
