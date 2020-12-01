# Database

(maybe using Postgresql, because data have relationship)

---

## Authors

id: id
username: string
password: string (encrypt)
refresh_token: string (JWT)
iat: Date

---

## Cards

id: id
author: Author.id
status: ACTIVE | INACTIVE
content: richtext
category: Category.id
iat: Date

---

## Categories

id: id
name: string
