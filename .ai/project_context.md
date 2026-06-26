# EduStream LMS

## Project Overview

EduStream is a production-ready Learning Management System (LMS) designed for a single educational institution. The platform enables institutions to manage teachers, students, courses, batches, assessments, live classes, payments, and certifications within a scalable and maintainable architecture.

The project emphasizes long-term maintainability, scalability, readability, and extensibility while following modern software engineering practices.

---

# Vision

EduStream aims to become a modern education platform that provides:

- Efficient course management
- Interactive live learning experiences
- Secure authentication and authorization
- Comprehensive student progress tracking
- Real payment processing
- Dynamic certificate generation
- Community engagement through forums and reviews

The architecture should support future feature expansion without requiring major redesign.

---

# Technology Stack

## Frontend

- Next.js 15
- TypeScript
- Redux Toolkit
- Axios
- React Hook Form
- Zod
- Shadcn UI

## Backend

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- Redis
- Socket.IO
- WebRTC

---

# User Roles

## Institution Admin

Responsible for managing the entire institution.

Responsibilities include:

- Managing teachers
- Managing students
- Creating and managing courses
- Creating batches
- Assigning teachers
- Scheduling live classes
- Managing certificates
- Monitoring analytics
- Managing teacher salary reviews

---

## Teacher

Responsible for delivering educational content.

Responsibilities include:

- Conducting live classes
- Uploading study materials
- Creating assignments
- Creating MCQ tests
- Managing course content
- Tracking student progress

---

## Student

Responsible for learning activities.

Responsibilities include:

- Purchasing courses
- Viewing enrolled courses
- Attending live classes
- Completing assignments
- Taking assessments
- Tracking learning progress
- Participating in forums
- Rating teachers and courses

---

# Core Modules

The project consists of the following business modules.

## Identity & Access Management

- Authentication
- Authorization
- User Profiles
- Role Based Access Control

---

## Course Management

- Courses
- Modules
- Pricing
- Categories

---

## Batch Management

- Batch Creation
- Student Assignment
- Teacher Assignment
- Live Class Scheduling

---

## Learning Management

- Course Materials
- Assignments
- Progress Tracking
- Notes

---

## Assessment

- MCQ Tests
- Results
- Certificates

---

## Payments

- Razorpay
- Stripe
- Refund Management
- Purchase History

---

## Analytics

- Teacher Analytics
- Student Analytics
- Course Analytics

---

## Community

- Reviews
- Ratings
- Discussion Forum

---

# Business Rules

The following business rules define how the system behaves.

### Enrollment

Students purchase a Course.

Students are **not** directly enrolled into a Batch.

Institution Administrators assign purchased students into an available Batch.

If no suitable Batch is assigned within the allowed period, the institution may issue a refund according to business policy.

---

### Live Classes

Each Batch has scheduled live classes.

Only assigned teachers can conduct classes.

Only enrolled students can join.

---

### Certificates

Certificates are generated dynamically as PDF documents.

Certificates require institution approval before becoming available for download.

---

### Payments

Only real payment gateway integrations are used.

Supported gateways include:

- Razorpay
- Stripe

Mock payment implementations should not be used unless explicitly requested for testing.

---

### Teacher Performance

Students may review teachers after live classes.

Teacher reviews contribute to analytics.

Institution Administrators may temporarily hold salary payments based on review policies.

---

# Project Goals

The project should always prioritize:

- Scalability
- Maintainability
- Simplicity
- Readability
- Testability
- Extensibility

---

# Development Philosophy

The objective is to build production-quality software rather than simply completing features.

Every implementation should be:

- Easy to understand
- Easy to maintain
- Easy to extend
- Consistent across modules

The architecture should remain stable as new features are added.

Avoid unnecessary complexity and over-engineering.

Prefer simple, maintainable solutions over clever implementations.