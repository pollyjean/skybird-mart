# Skybird Mart

## 목적

Next.js 백엔드 해보자

## 사용기술

- TypeScript
- tailwindCSS

## 하고 있는 것

- tailwind prettier 로 클래스 순서 맞추기
- page router 코드를 app router 코드로 변경하기
- Prisma와 PlanetScale 설치, 설정
- Session 처리, Custom React Hook

## Database Flow

```mermaid
  erDiagram
    User ||--o{ Tweet : posts
    User ||--o{ Like : gives
    User ||--o{ Reply : writes
    Tweet ||--o{ Like : receives
    Tweet ||--o{ Reply : receives
    Reply ||--o{ Reply : hasParent
    Reply ||--o{ Reply : hasChild

    User {
        Int id PK
        String username
        String email
        String password
        String avatar
        DateTime createdAt
        DateTime updatedAt
    }
    Tweet {
        Int id PK
        String text
        DateTime createdAt
        Int authorId FK
    }
    Reply {
        Int id PK
        String text
        DateTime createdAt
        Int authorId FK
        Int tweetId FK
        Int parentReplyId FK
    }
    Like {
        Int id PK
        DateTime createdAt
        Int userId FK
        Int tweetId FK
    }
```
