# Renting Car Project Checklist

| Task ID | Task Description | Status | Estimated Hours | Day | Notes |
|---------|------------------|--------|-----------------|-----|-------|
| **Backend Tasks** | | | |
| B1 | Set up Spring Boot project with Hilla | ☐ To Do | 4 | May 26 | Use Spring Initializr |
| B2 | Configure DynamoDB with single-table designs | ☐ To Do | 6 | May 27 | Set up AWS credentials |
| B3 | Create bean classes (Car, Booking, User) | ☐ To Do | 4 | May 28 | Use Lombok for brevity |
| B4 | Implement repository interfaces | ☐ To Do | 6 | May 29 | Extend Spring Data DynamoDB |
| B5 | Set up service and endpoints layer | ☐ To Do | 10 | May 30–31 | Follow REST best practices |
| **Frontend Tasks** | | | |
| F1 | Set up Hilla/React project | ☐ To Do | 4 | May 26 | Install Material UI, Axios, etc. |
| F2 | Create project structure | ☐ To Do | 4 | May 27 | Organize components, hooks, etc. |
| F3 | Set up API Context | ☐ To Do | 5 | May 28 | Manage API requests and states |
| F4 | Create custom hooks (useCars, useBookings, useUsers) | ☐ To Do | 7 | May 29–30 | Use useContext for state |
| F5 | Implement basic layout with Material UI | ☐ To Do | 6 | June 6–7 | Include Header, Sidebar, Footer |
| **Mandatory Tasks** | | | |
| M1.1 | List cars (v1.1) | ☐ To Do | 6 | June 1–2 | Extend from commit 9e88199 |
| M1.1.1 | Data model for available cars (v1.1.1) | ☐ To Do | 6 | June 2 | Align with DynamoDB single-table design |
| M1.1.2 | Admin create availability calendar (v1.1.2) | ☐ To Do | 9 | June 3 | Use bash/python if needed for DynamoDB |
| M1.1.3 | User query available cars by dates/delegation (v1.1.3) | ☐ To Do | 9 | June 4 | Calendar interface integration |
| M1.2 | Make a booking for car/dates/delegation (v1.2) | ☐ To Do | 8 | June 5 | Ensure transaction safety |
| M1.3 | Update available cars in DynamoDB (v1.3) | ☐ To Do | 6 | June 6 | Optimize single-table updates |
| M2 | Create five data models for available cars | ☐ To Do | 8 | May 31–June 1 | Document advantages/disadvantages |
| M3 | Booking list view and admin dashboard | ☐ To Do | 15 | June 7–8 | Simplify dashboard if needed |
| M4 | User profile management system | ☐ To Do | 5 | June 10 | Focus on profile updates |
| **Voluntary Task** | | | |
| V3 | AWS Cognito Authentication | ☐ To Do | 9 | June 9 | Integrate with React and Spring Boot |
| **Extra Task (Partial)** | | | |
| E1 | Basic testing (JUnit, Jest) | ☐ To Do | 3 | June 10 | Test critical services/components |