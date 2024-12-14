package user

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

func scanRowIntoUser(row *sql.Rows) (*models.User, error) {
	user := new(models.User)

	err := row.Scan(
		&user.ID,
		&user.Username,
		&user.Fullname,
		&user.Phone,
		&user.Email,
		&user.Password,
		&user.Gender,
		&user.Bio,
		&user.PictureID,
		&user.RoleID,
		&user.CreatedAt,
		&user.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *Store) GetUserByUsername(username string) (*models.User, error) {
	rows, err := s.db.Query("SELECT * FROM users WHERE username = ?", username)
	if err != nil {
		return nil, err
	}

	u := new(models.User)
	for rows.Next() {
		u, err = scanRowIntoUser(rows)
		if err != nil {
			return nil, err
		}
	}

	if u.Username == "" {
		return nil, fmt.Errorf("User not found")
	}

	return u, nil
}

func (s *Store) GetUserByID(id int) (*models.User, error) {
	rows, err := s.db.Query("SELECT * FROM users WHERE id = ?", id)
	if err != nil {
		return nil, err
	}

	u := new(models.User)
	for rows.Next() {
		u, err = scanRowIntoUser(rows)
		if err != nil {
			return nil, err
		}
	}

	if u.ID == 0 {
		return nil, fmt.Errorf("User not found")
	}

	return u, nil
}

func (s *Store) CreateUser(user *models.User) error {
	_, err := s.db.Exec("INSERT INTO users (username, fullname, phone, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?)", user.Username, user.Fullname, user.Phone, user.Email, user.Password, user.RoleID)
	if err != nil {
		return err
	}

	return nil
}
