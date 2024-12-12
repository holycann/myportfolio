package models

type Project struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Desc      string `json:"desc"`
	StartDate string `json:"start_date"`
	EndDate   string `json:"end_date"`
	Status    string `json:"status"`
}
