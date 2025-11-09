[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=19902501&assignment_repo_type=AssignmentRepo)

# P2-Challenge-1 (Server Side)

> Tuliskan API Docs kamu di sini



### GLOBAL ERROR /500

- Response Body (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

### POST /login

- Response Body (200 - Ok)

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzUyMTY2NDE1fQ.SqRGA8SAVVgcP2ONAVQSlH7nGqSWUGT1y4Ji64QyXjA"
}
```

- Response Body (400 - BadRequest)

```json
{
  "message": "Email is required"
}
{
  "message": "Password is required"
}
```

- Response Body (401 - Unauthorized)

```json
{
  "message": "Email or password is required"
}
```

### POST /add-user

- Response Headers

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzUyMjk1NTg2fQ.c68VHosZ9gVWN9yUyTs_V0SIbE7b4k-Wk6IZEq-gt0U"
}
```

- Response Body (201 - Created)

```json
{
  "email": "testapi@mail.com",
  "phoneNumber": "081322334455",
  "address": "Jakarta Selatan",
  "username": "testapi",
  "role": "Admin"
}
```

- Response Body (400 - BadRequest)

```json
{
    "message": "Username already exists"
}
{
    "message": "Email already exists"
}
{
    "message": "Email format invalid"
}
{
  "message": "Email is required"
}
{
    "message": "Password is required"
}
{
    "message": "Password at least 5 characters"
}
```

### POST /posts

- Response Body (201 - Created)

```json
{
  "id": 22,
  "title": "Test API Docs",
  "content": "Lorem ipsum lorem ipsum lorem ipsum",
  "imgUrl": "https://picsum.photos/200/300",
  "categoryId": 5,
  "AuthorId": 1,
  "updatedAt": "2025-07-11T04:10:07.669Z",
  "createdAt": "2025-07-11T04:10:07.669Z"
}
```

- Response Body (400 - BadRequest)

```json
{
  "message": "Title is required"
}
{
    "message": "Content is required"
}
{
    "message": "Image is required"
}
{
    "message": "Category is required"
}
```

### GET /posts

- Response Body (200 - OK)

```json
[
  {
    "id": 1,
    "title": "Tips Efektif Mengelola Keuangan Pribadi",
    "content": "Mengelola keuangan pribadi adalah kunci mencapai tujuan finansial. Mulailah dengan membuat anggaran, lacak pengeluaran, dan sisihkan dana untuk tabungan serta investasi.",
    "imgUrl": "https://example.com/images/keuangan1.jpg",
    "categoryId": 1,
    "AuthorId": 1,
    "createdAt": "2025-07-10T15:50:24.638Z",
    "updatedAt": "2025-07-10T15:50:24.638Z",
    "User": {
      "id": 1,
      "username": "admin1",
      "email": "admin1@mail.com",
      "role": "Admin",
      "phoneNumber": "081234567890",
      "address": "Jl. Mawar No. 10, Jakarta"
    }
  },
  {
    "id": 2,
    "title": "Mengenal Berbagai Jenis Investasi",
    "content": "Pahami perbedaan antara saham, obligasi, reksa dana, dan properti sebelum memutuskan berinvestasi. Setiap jenis memiliki risiko dan potensi keuntungan yang berbeda.",
    "imgUrl": "https://example.com/images/investasi2.jpg",
    "categoryId": 2,
    "AuthorId": 2,
    "createdAt": "2025-07-10T15:50:24.638Z",
    "updatedAt": "2025-07-10T15:50:24.638Z",
    "User": {
      "id": 2,
      "username": "admin2",
      "email": "admin2@mail.com",
      "role": "Staff",
      "phoneNumber": "081333445566",
      "address": "Jl. Melati No.100, Surabaya"
    }
  }
]
```

### GET /posts/:id

- Response Body (200 - OK)

```json
{
  "id": 22,
  "title": "Test API Docs",
  "content": "Lorem ipsum lorem ipsum lorem ipsum",
  "imgUrl": "https://picsum.photos/200/300",
  "categoryId": 5,
  "AuthorId": 1,
  "createdAt": "2025-07-11T04:10:07.669Z",
  "updatedAt": "2025-07-11T04:10:07.669Z"
}
```

- Response Body (404 - NotFound)

```json
{
  "message": "Post with id 99 not found"
}
```

### PUT /posts/:id

- Response Body (200 - OK)

```json
{
  "id": 20,
  "title": "Test API Docs Edited",
  "content": "Test Content API Docs edited",
  "imgUrl": "htttp://example.com",
  "categoryId": 1,
  "AuthorId": 1,
  "createdAt": "2025-07-10T15:50:24.638Z",
  "updatedAt": "2025-07-11T06:46:22.082Z"
}
```

- Response Body (404 - NotFound)

```json
{
  "message": "Post with id 99 not found"
}
```

- Response Body (400 - BadRequest)

```json
{
    "message": "Title is required"
}
{
    "message": "Content is required"
}
{
    "message": "Image is required"
}
{
    "message": "Category is required"
}
```

### DELETE /posts/:id

- Response Body (200 - OK)

```json
{
  "message": "Post with title 22 success to delete"
}
```

- Response Body (404 - NotFound)

```json
{
  "message": "Post with id 99 not found"
}
```

### POST /categories

- Response Body (201 - Created)

```json
{
  "id": 22,
  "name": "Test Jest",
  "updatedAt": "2025-07-11T04:15:00.676Z",
  "createdAt": "2025-07-11T04:15:00.676Z"
}
```

- Response Body (400 - BadRequest)

```json
{
  "message": "Name is Required"
}
```

### GET /categories

- Response Body (200 - OK)

```json
[
  {
    "id": 21,
    "name": "Budgeting",
    "createdAt": "2025-07-10T15:50:24.631Z",
    "updatedAt": "2025-07-10T15:50:24.631Z"
  },
  {
    "id": 22,
    "name": "Test Jest",
    "createdAt": "2025-07-11T04:15:00.676Z",
    "updatedAt": "2025-07-11T04:15:00.676Z"
  }
]
```

### PUT /categories/:id

- Response Body (200 - OK)

```json
{
  "id": 22,
  "name": "Test Jest Edited",
  "createdAt": "2025-07-11T04:15:00.676Z",
  "updatedAt": "2025-07-11T04:17:27.675Z"
}
```

- Response Body (404 - NotFound)

```json
{
  "message": "Category with id 99 not found"
}
```

- Response Body (400 - BadRequest)

```json
{
  "message": "Name is Required"
}
```

### GET /pub/posts

- Response Body (200 - OK)

```json
[
  {
    "id": 21,
    "title": "Pentingnya Literasi Keuangan Sejak Dini",
    "content": "Mendidik anak tentang uang sejak usia muda adalah investasi terbaik untuk masa depan finansial mereka.",
    "imgUrl": "https://example.com/images/literasi19.jpg",
    "categoryId": 1,
    "AuthorId": 3,
    "createdAt": "2025-07-10T15:50:24.638Z",
    "updatedAt": "2025-07-10T15:50:24.638Z"
  },
  {
    "id": 22,
    "title": "Cara Mengurangi Pengeluaran Rumah Tangga",
    "content": "Tips praktis untuk menghemat pengeluaran bulanan di rumah tanpa mengurangi kualitas hidup secara drastis.",
    "imgUrl": "https://example.com/images/hemat20.jpg",
    "categoryId": 1,
    "AuthorId": 1,
    "createdAt": "2025-07-10T15:50:24.638Z",
    "updatedAt": "2025-07-10T15:50:24.638Z"
  }
]
```

### GET /pub/posts:id

- Response Body (200 - OK)

```json
{
  "id": 22,
  "title": "Cara Mengurangi Pengeluaran Rumah Tangga",
  "content": "Tips praktis untuk menghemat pengeluaran bulanan di rumah tanpa mengurangi kualitas hidup secara drastis.",
  "imgUrl": "https://example.com/images/hemat20.jpg",
  "categoryId": 1,
  "AuthorId": 1,
  "createdAt": "2025-07-10T15:50:24.638Z",
  "updatedAt": "2025-07-10T15:50:24.638Z"
}
```

- Response Body (404 - NotFound)

```json
{
  "message": "Post with id 99 not found"
}
```
