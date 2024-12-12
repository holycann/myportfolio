package models

type Gallery struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Desc      string `json:"desc"`
	PictureID string `json:"picture_id"`
}
