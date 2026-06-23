# EduStream LMS - Project Context

## Overview
EduStream is a scalable Learning Management System (LMS) designed for a single institute. 

## Tech Stack
- **Frontend**: Next.js 15, TypeScript, Shadcn UI, Redux Toolkit, Axios, React Hook Form + Zod.
- **Backend**: Node.js, Express, TypeScript, MongoDB, Mongoose.
- **Architecture**: Clean Architecture, SOLID principles.

## Roles
1. Institution Admin
2. Teacher
3. Student

## Core Modules & Bounded Contexts
1. **Identity & Access Management (IAM)**: Auth (JWT), RBAC, Profiles.
2. **Catalog & Course Management**: Courses, Modules, Pricing.
3. **Batch & Scheduling Management**: Batches, Teacher Assignments, Live Classes.
4. **Learning Experience (LMS Core)**: Materials, Assignments, Deadlines.
5. **Evaluation & Assessment**: MCQ Tests, Submissions, Dynamic PDF Certificates.
6. **Financials & Analytics**: Real payment integration (Stripe/Razorpay), Teacher analytics, Salary holds.
7. **Community & Engagement**: Reviews, Forum.

## Folder Structure (Backend)
```text
backend/src/
├── domain/                  # Enterprise business rules & Entities (Interfaces, base entities)
│   ├── <module_name>/       # E.g., user, course, batch
│   │   ├── entities/
│   │   └── repositories/
├── application/             # Application business rules (Use Cases)
│   ├── <module_name>/
│   │   └── use-cases/
├── interface-adapters/      # Adapters (Controllers, Middlewares)
│   ├── controllers/
│   ├── middlewares/
│   └── presentation/
├── infrastructure/          # Frameworks, Drivers, Tools
│   ├── database/            # Mongoose Models, Repositories
│   ├── auth/                # JWT
│   └── services/            # Stripe, PDF Generator
└── main/                    # Dependency Injection, Server setup
    ├── config/
    ├── routes/
    ├── server.ts
    └── index.ts
```

## Key Decisions
- **Enrollment**: Students purchase a generic Course, Admin assigns them to a specific Batch within 2 weeks, or payment is refunded.
- **Payments**: Real payment gateway integration (Stripe/Razorpay). No mock implementations.
- **Certificates**: Dynamically generated as actual PDFs.
- **Rules**: Follow Clean Architecture. Avoid duplicate code. Prefer composition for domain entities. DO NOT CODE until explicitly instructed by the user.
